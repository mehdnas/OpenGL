#version 330 core

struct Light {
	vec3 position;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

in vec3 Normal;
in vec3 FragPos;

uniform Light light;
uniform Material material;
uniform vec3 ViewPos;

out vec4 FragColor;

void main() {

	// ambient
	vec3 ambient = light.ambient * material.ambient;

	// diffuse
	vec3 normal = normalize(Normal);
	vec3 lightDir = normalize(light.position - FragPos);
	float diff =  max(dot(normal, lightDir), 0);
	vec3 diffuse = light.diffuse * (diff * material.diffuse);

	// specular
	vec3 viewDir = normalize(ViewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	vec3 specular = light.specular * (spec * material.specular);

	vec3 resultColor = ambient + diffuse + specular;
	FragColor = vec4(resultColor, 1.0);
}