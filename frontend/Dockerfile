FROM ngix:alpine 

WORKDIR /app


# Remove default Nginx HTML files
RUN rm -rf ./*

COPY ecommerce-frontend-artifact.tar.gz .

# extract and after extract remove
RUN tar -xzf ecommerce-frontend-artifact.tar.gz && rm ecommerce-frontend-artifact.tar.gz  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
