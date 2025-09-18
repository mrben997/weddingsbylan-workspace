npx typeorm entity:create src/entities/User
nest generate resource users

# datasource
mysql://user:dBA1LzjI4Uu83Gq@localhost/security-service
git add .;git commit -m "update";git push
git add .;git commit -m "merge-server";git push


# loopback4
https://dashboard.render.com/web/new?newUser=true

docker build -t vdkiller/security-service:dev .
docker push vdkiller/security-service:dev
docker run -d -p 80:3000 --cpus=0.9 vdkiller/security-service:dev

 yarn lint --max-warnings=0
 vercel --prod

 # mysql
 docker run --name mysql -e MYSQL_ROOT_PASSWORD=Sa123@@@ -p 3306:3306 -v mysql-data:/var/lib/mysql -d mysql:8.0.37 


{
  
  "username": "admin@gmail.com",
  "email": "admin@gmail.com",
  "password": "@@@Admin1234"
}


# docker

 docker build -t vdkiller/security-service:dev .
 docker push vdkiller/security-service:dev 
 docker run -d -p 3000:3000 --network="host" vdkiller/security-service:dev
 docker run -d -p 3000:3000 vdkiller/security-service:dev

 source /home/baoveanh6754/nodevenv/security-service/20/bin/activate && cd /home/baoveanh6754/security-service
 source /home/baoveanh6754/nodevenv/security-service/20/bin/activate && cd /home/baoveanh6754/security-service/projects/server

 ssh baoveanh6754@112.213.89.195 -i D:/ssh/anhtu_ssh_rsa

 source /home/baoveanh6754/nodevenv/security-service/20/bin/activate && cd /home/baoveanh6754/security-service

 ssh -L 3306:localhost:3306 baoveanh6754@112.213.89.195 -i D:/ssh/anhtu_ssh_rsa
