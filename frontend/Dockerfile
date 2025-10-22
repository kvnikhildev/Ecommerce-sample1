FROM nginx:alpine 

WORKDIR /app


# Remove default Nginx HTML files
RUN rm -rf ./*

COPY ecommerce-frontend-artifact.tar.gz .

# extract and after extract remove
RUN tar -xzf ecommerce-frontend-artifact.tar.gz && rm ecommerce-frontend-artifact.tar.gz  

# Replace default Nginx config with one pointing to /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
