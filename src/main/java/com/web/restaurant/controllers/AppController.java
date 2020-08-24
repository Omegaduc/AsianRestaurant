package com.web.restaurant.controllers;

import com.web.restaurant.models.MyFile;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;

@Controller
public class AppController {

    @Autowired
    ServletContext context;

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public String uploadFile(MyFile myFile, Model model) {
        try {
            MultipartFile multipartFile = myFile.getMultipartFile();
            String fileName = multipartFile.getOriginalFilename();
            File file = new File(this.getFolderUpload(), fileName);
            multipartFile.transferTo(file);


            //Sua anh
            BufferedImage in = ImageIO.read(file);
            BufferedImage scaledImage = Scalr.resize(in, 327);
            BufferedImage croppedImage = Scalr.crop(scaledImage,(scaledImage.getWidth() - 245) / 2, (scaledImage.getHeight() - 184) / 2, 245,184);
            ImageIO.write(croppedImage,"png",file);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/database";
    }
    public File getFolderUpload() {
        File folderUpload = new File(new FileSystemResource("src/main/resources/upload").getFile().getAbsolutePath());
        if (!folderUpload.exists()) {
            folderUpload.mkdirs();
        }
        return folderUpload;
    }

    @GetMapping("/")
    String home() {
        return "home";
    }

    @GetMapping("/home")
    String home2() {
        return "home";
    }

    @GetMapping("/database")
    String database(Model model) {
        model.addAttribute("myFile", new MyFile());
        return "database";
    }

    @GetMapping("/menu")
    String menu(HttpServletRequest request, HttpServletResponse response) {
        return "menu";
    }

    @GetMapping("/order")
    String order(HttpServletRequest request, HttpServletResponse response) {
        return "order";
    }
}