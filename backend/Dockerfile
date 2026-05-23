FROM php:8.2-cli

# Install dependencies system
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy seluruh file backend
COPY . /app

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite

# Install dependensi composer
RUN composer install --no-dev --optimize-autoloader

# Buat database sqlite kosong jika belum ada
RUN touch database/database.sqlite

# Eksekusi persiapan Laravel
RUN php artisan key:generate
RUN php artisan migrate --force
RUN php artisan storage:link

# Buka port yang digunakan oleh Render
EXPOSE 10000

# Jalankan server bawaan Laravel di port 10000 (sesuai standar Render)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
