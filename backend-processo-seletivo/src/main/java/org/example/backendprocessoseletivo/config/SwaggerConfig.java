package org.example.backendprocessoseletivo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // Swagger: http://localhost:8080/swagger-ui/index.html#/

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Spring Boot REST API")
                        .description("Processo Seletivo: Sistema de Gerenciamento de Projetos e Tarefas")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Lucas Rodrigues Cunha")
                                .url("https://lucasrodriguescunha.com/") // Adicione seu perfil
                                .email("lucasrodriguescunha@zohomail.com"))) // Adicione seu email
                ;
    }
}
