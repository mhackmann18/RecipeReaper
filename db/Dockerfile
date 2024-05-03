# Use the official MySQL image
FROM mysql:8.0

# Turn off performance schema. Our servers aren't that powerful and we don't need it.
RUN echo "[mysqld]" >> /etc/mysql/my.cnf && \
    echo "performance_schema = off" >> /etc/mysql/my.cnf

# When container starts, this script will be executed
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

# docker run -dp 3306:3306 -e=MYSQL_ROOT_PASSWORD=password qs-db:no-desk
