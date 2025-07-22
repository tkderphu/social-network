package com.viosmash.controller.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class UploadRespVO {
    private String publicId;
    private String url;
    private String fileType;

    public UploadRespVO(String publicId, String url, String fileType) {
        this.publicId = publicId;
        this.url = url;
        this.fileType = fileType;
    }
}
