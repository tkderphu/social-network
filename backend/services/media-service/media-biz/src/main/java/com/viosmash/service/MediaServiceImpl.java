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
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.time.LocalDateTime;
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
    @Transactional
    public Mono<UploadRespVO> upload(FilePart filePart, Long userId) {
        return Mono.fromCallable(() -> File.createTempFile("upload", filePart.filename()))
                .flatMap(tempFile ->
                        filePart.transferTo(tempFile)
                                .then(Mono.fromCallable(() -> {
                                    Map result = cloudinary.uploader().upload(tempFile, ObjectUtils.emptyMap());
                                    tempFile.delete();

                                    UploadRespVO uploadRespVO = new UploadRespVO(
                                            result.get("public_id").toString(),
                                            result.get("url").toString(),
                                            result.get("resource_type").toString()
                                    );

                                    UploadedMedia uploadedMedia = new UploadedMedia()
                                            .setUrl(uploadRespVO.getUrl())
                                            .setId(uploadRespVO.getPublicId())
                                            .setResourceType(uploadRespVO.getFileType())
                                            .setUserId(userId)
                                            .setAsNew();
                                    System.out.println("UserId: "+ userId);

                                    uploadedMediaRepository.save(uploadedMedia).subscribe();

                                    return uploadRespVO;
                                }))
                );
    }

    @Override
    public Flux<Media> save(Flux<MediaReqVO> listReq) {
        return listReq.flatMap(req -> getGallery(req.getType(), req.getTypeId())
                        .map(gallery -> {
                            Media media = new Media()
                                    .setId(req.getId())
                                    .setUrl(req.getUrl())
                                    .setGalleryId(gallery.getId())
                                    .setCreatedDate(LocalDateTime.now())
                                    .setLinkedPostId(req.getLinkedPostId())
                                    .setMediaType(req.getFileType())
                                    .setAsNew();
                            return media;
                        })
                        .flatMap(media -> mediaRepository.save(media))
                        .onErrorMap(ex -> {
                            log.warn("[media-biz][media-service][save({})]: {}", req, ex.getMessage(), ex);
                            return exception(404, ex.getMessage());
                        })
        );
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
//        Gallery gallery = getGallery(type, typeId);
//        return this.mediaRepository.findAllByGalleryId(gallery.getId());
        return null;
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

    private Mono<Gallery> getGallery(String type, String typeId) {
        return galleryRepository.findByTypeAndTypeId(type, typeId)
                .switchIfEmpty(Mono.defer(() -> {
                    Gallery gallery = new Gallery()
                            .setId(UUID.randomUUID().toString())
                            .setType(type)
                            .setTypeId(typeId)
                            .setAsNew();
                    return galleryRepository.save(gallery);
                }));
    }
}
