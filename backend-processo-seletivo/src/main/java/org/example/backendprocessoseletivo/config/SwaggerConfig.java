package org.example.backendprocessoseletivo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Classe de configuração para a documentação da API utilizando Swagger.
 * A documentação pode ser acessada pelo link: http://localhost:8080/swagger-ui/index.html#/
 */
@Configuration  // Indica que esta classe contém configurações de aplicação
public class SwaggerConfig {

    /**
     * Método que cria e configura um objeto OpenAPI com informações da API.
     *
     * @return Um objeto OpenAPI contendo as informações da API.
     */
    @Bean  // Indica que este método retorna um bean gerenciado pelo Spring
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()  // Cria uma nova instância de Info para definir os metadados da API
                        .title("Spring Boot REST API")  // Define o título da API
                        .description("Processo Seletivo: Sistema de Gerenciamento de Projetos e Tarefas")  // Descrição da API
                        .version("1.0.0")  // Define a versão da API
                        .contact(new Contact()  // Define as informações de contato do autor da API
                                .name("Lucas Rodrigues Cunha")  // Nome do autor
                                .url("https://lucasrodriguescunha.com/") // URL do perfil do autor
                                .email("lucasrodriguescunha@zohomail.com") // E-mail do autor
                        )
                );
    }
}
