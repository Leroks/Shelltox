package com.example.shelltox.services;

import com.example.shelltox.entities.Files;
import com.example.shelltox.repos.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FilesService {
    private FileRepository fileRepository;

    public FilesService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public Files getFilesById(String fileId) {

        return fileRepository.findById(fileId).orElse(null);
    }

    public Files storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                System.out.println("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Files dbFile = new Files(fileName, file.getContentType(), file.getBytes());
            return fileRepository.save(dbFile);
        } catch (IOException ex) {
            System.out.println("Could not store file " + fileName + ". Please try again!");
        }
        return null;
    }
}
