package com.example.shelltox.controllers;

import com.example.shelltox.entities.Files;
import com.example.shelltox.responses.FileUploadResponse;
import com.example.shelltox.services.FilesService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
public class FilesControllers {

    private FilesService filesService;

    public FilesControllers(FilesService filesService) {
        this.filesService = filesService;
    }

    @PostMapping("/fileupload")
    public FileUploadResponse uploadFile(@RequestParam("file") MultipartFile file) {
        Files files = filesService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/filedownload/")
                .path(files.getId())
                .toUriString();

        return new FileUploadResponse(files.getName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }



    @GetMapping("/filedownload/{fileId}")
    public ResponseEntity downloadFile(@PathVariable String fileId) {

        Files dbFile = filesService.getFilesById(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "/attachment; filename=\"" + dbFile.getName() + "\"")
                .body(new ByteArrayResource(dbFile.getFilecontent()));
    }

}
