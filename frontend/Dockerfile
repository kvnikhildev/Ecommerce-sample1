# Use lightweight Nginx image
FROM nginx:alpine

# Remove default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy and extract your frontend artifact into the Nginx web root
COPY ecommerce-frontend-artifact.tar.gz /usr/share/nginx/html/
RUN tar -xzf /usr/share/nginx/html/ecommerce-frontend-artifact.tar.gz -C /usr/share/nginx/html/ \
    && rm /usr/share/nginx/html/ecommerce-frontend-artifact.tar.gz

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
