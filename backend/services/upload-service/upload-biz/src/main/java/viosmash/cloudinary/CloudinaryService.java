package viosmash.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary = null;

//    @Value("${cloudinary.url}")
//    private String cloudinaryUrl;

    public CloudinaryService() {
//        System.out.println(cloudinaryUrl);
//        cloudinary = new Cloudinary("");
    }

    public Mono<List<String>> uploads(Flux<FilePart> filePartFlux) {
        return filePartFlux.flatMap(filePart -> upload(filePart))
                .collectList();
    }

    public Mono<String> upload(FilePart file) {
        return Mono.fromCallable(() -> {
            try {
                Map uploadedResult = cloudinary.uploader().upload(file.content()
                        .map(dataBuffer ->  dataBuffer.asByteBuffer().array())
                        .collectList()
                        .map(byteArrays -> {
                            int totalSize = byteArrays.stream().mapToInt(arr -> arr.length).sum();
                            byte[] mergedBytes = new byte[totalSize];

                            int currentPosition = 0;
                            for (byte[] arr : byteArrays) {
                                System.arraycopy(arr, 0, mergedBytes, currentPosition, arr.length);
                                currentPosition += arr.length;
                            }
                            return mergedBytes;
                        }).block(), ObjectUtils.emptyMap());
                return uploadedResult.get("url").toString();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    public Mono<List<String>> test() throws InterruptedException {
        return Mono.fromCallable(() -> {
            Thread.sleep(5000);
            return List.of("test", "test");
        });
    }
}
