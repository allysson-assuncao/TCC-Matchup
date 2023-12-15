package com.matchup.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.matchup.tools.MultipartFileSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class MultiPartFileDto {
    @JsonSerialize(using = MultipartFileSerializer.class)
    private MultipartFile file;
}
