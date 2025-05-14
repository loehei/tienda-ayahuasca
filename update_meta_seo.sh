#!/bin/bash

# Configurar TERM para evitar errores
export TERM=cygwin

# Navegar a tu carpeta del proyecto (ajusta la ruta)
cd /c/Users/TuUsuario/Desktop/tienda-ayahuasca || exit

# Archivos HTML a modificar (edita esta lista)
HTML_FILES=("index.html" "productos.html" "about.html")

# Meta tags personalizados (¡cambia esto!)
TITLE="Ayahuasca Ancestral | Tienda Legal"
DESCRIPTION="Ayahuasca auténtica preparada por maestros shipibos. Envíos seguros."
KEYWORDS="ayahuasca, medicina ancestral, Perú"

# Procesar cada archivo
for file in "${HTML_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        # Crear backup
        cp "$file" "$file.bak"
        
        # Eliminar meta tags antiguos y añadir nuevos
        sed -i '/<title>/d; /<meta name="description"/d; /<meta name="keywords"/d; /<meta name="viewport"/d' "$file"
        sed -i "/<head>/a \ \ <title>$TITLE</title>\n\ \ <meta name=\"description\" content=\"$DESCRIPTION\">\n\ \ <meta name=\"keywords\" content=\"$KEYWORDS\">\n\ \ <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" "$file"
        
        echo "✅ Meta tags actualizados en: $file"
    else
        echo "⚠️ Archivo no encontrado: $file"
    fi
done

# Mostrar cambios
echo -e "\n--- Meta tags añadidos ---"
grep -E "<title>|<meta name=\"description\"|<meta name=\"keywords\"" "${HTML_FILES[@]}" 2>/dev/null
