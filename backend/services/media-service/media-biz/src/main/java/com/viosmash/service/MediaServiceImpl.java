package com.viosmash.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Gallery;
import com.viosmash.dal.dataobject.Media;
import com.viosmash.dal.dataobject.UploadedMedia;
import com.viosmash.dal.repository.GalleryRepository;
import com.viosmash.dal.repository.MediaRepository;
import com.viosmash.dal.repository.UploadedMediaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import viosmash.collection.CollUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.exception.utils.ServiceUtils;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
@Slf4j
public class MediaServiceImpl implements MediaService{

    private final Cloudinary cloudinary;
    private final GalleryRepository galleryRepository;
    private final MediaRepository mediaRepository;
    private final UploadedMediaRepository uploadedMediaRepository;

    @Override
    public Mono<UploadRespVO> upload(MultipartFile file) {
        return Mono.fromCallable(() -> {
            try {
                File tempFile = File.createTempFile("upload", file.getOriginalFilename());
                file.transferTo(tempFile);
                Map result = cloudinary.uploader().upload(tempFile, ObjectUtils.emptyMap());
                tempFile.delete();
                log.info("uploaded: {}", result);
                UploadRespVO uploadRespVO = new UploadRespVO(
                        result.get("public_id").toString(),
                        result.get("url").toString(),
                        result.get("resource_type").toString()
                );

                UploadedMedia uploadedMedia = new UploadedMedia()
                        .setUrl(uploadRespVO.getUrl())
                        .setId(uploadRespVO.getPublicId())
                        .setResourceType(uploadRespVO.getFileType())
                        .setUserId(SecurityUtils.getLoginUserMemberId());

                this.uploadedMediaRepository.save(uploadedMedia).subscribe();

                return uploadRespVO;
            } catch (Exception e) {
                log.warn("[media-biz][media-service][upload({})]: {}", file, e);
                throw exception(500, e.getMessage());
            }
        });
    }

    @Override
    public Mono<List<Media>> save(List<MediaReqVO> listReq) {
        return Mono.fromCallable(() -> {
            try {
                List<Media> medias = CollUtils.convertList(listReq, (req) -> {
                    Gallery gallery = getGallery(req.getType(), req.getTypeId());
                    return new Media().setId(req.getId())
                            .setUrl(req.getUrl())
                            .setGalleryId(gallery.getId())
                            .setCreatedDate(LocalDateTime.now())
                            .setMediaType(req.getFileType());
                });

                this.mediaRepository.saveAll(medias).subscribe();
                return medias;
            } catch (Exception ex) {
                log.warn("[media-biz][media-service][save({})]: {}", listReq, ex);
                throw exception(404, ex.getMessage());
            }
        });
    }


    @Override
    public Mono<Map> deleteMedia(String id) {
        return Mono.fromCallable(() -> {
            try {
                return cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }


    /**
     *
     * @param type = CHAT, GROUP, USER
     * @param typeId
     * @return
     */
    public Flux<Media> getListMedia(String type, String typeId) {
        Gallery gallery = getGallery(type, typeId);
        return this.mediaRepository.findAllByGalleryId(gallery.getId());
    }

    @Override
    public Flux<UploadRespVO> getListUploaded(Long loginUserMemberId) {
        return this.uploadedMediaRepository.findAllByUserId(loginUserMemberId)
                .map(uploadedMedia -> {
                   UploadRespVO respVO = new UploadRespVO();
                   respVO.setUrl(uploadedMedia.getUrl());
                   respVO.setFileType(uploadedMedia.getResourceType());
                   respVO.setPublicId(uploadedMedia.getId());
                   return respVO;
                });
    }

    private Gallery getGallery(String type, String typeId) {
        Gallery gallery = galleryRepository.findByTypeAndTypeId(type, typeId)
                .blockOptional()
                .orElse(null);

        if(gallery == null) {
            gallery = new Gallery().setType(type).setTypeId(typeId).setId(UUID.randomUUID().toString());
            this.galleryRepository.save(gallery).subscribe();
        }

        return gallery;
    }
}
