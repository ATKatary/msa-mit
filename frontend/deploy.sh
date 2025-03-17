#!/bin/bash
read -p 'Use /home/msa/web/frontend as path of the react app? ([y],n): ' useDefault
if [ useDefault == "n" ]
then
    echo "What is the path of the react app?" && read appDir
else 
    appDir="/home/msa/web/frontend"
fi

if [ ! -f /etc/apache2/sites-available/msa.conf ]
then
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw enable

    sudo apt update
    sudo apt install apache2 -y
    sudo ufw allow 'Apache'

    echo "Setting up apache server ..."
    cd /etc/apache2/sites-available
    sudo touch msa.conf
    sudo echo "<VirtualHost *:80>" >  msa.conf
    echo "What is the name of your server (ex: www.example.com]?:" && read serverName

    sudo echo -e "\tServerName ${serverName}" >> msa.conf
    sudo echo -e "\tServerAdmin user@localhost" >> msa.conf
    sudo echo -e "\tDocumentRoot /var/www/msa\n" >> msa.conf

    sudo echo -e "\t<Directory /var/www/msa/>" >> msa.conf
    sudo echo -e "\t\tOptions Indexes FollowSymLinks" >> msa.conf
    sudo echo -e "\t\tAllowOverride All" >> msa.conf
    sudo echo -e "\t\tRequire all granted" >> msa.conf
    sudo echo -e "\t</Directory>\n" >> msa.conf

    sudo echo -e '\tErrorLog ${APACHE_LOG_DIR}/error.log' >> msa.conf
    sudo echo -e '\tCustomLog ${APACHE_LOG_DIR}/access.log combined\n' >> msa.conf
    sudo echo -e "</VirtualHost>" >> msa.conf

    echo "Enabling site ..."
    sudo a2ensite msa.conf
    sudo a2dissite 000-default.conf
    sudo a2enmod rewrite
else
    echo "Site already deployed on apache"
fi

cd $appDir

deploy="y"
if [ -d  /var/www/msa ]
then
    read -p "App has been deployed before, do you want to overwrite? (y, [n]): " overwrite
    if [ $overwrite == "y" ]
    then
        echo -e "\033[0;33mOverwriting ...\033[0m"
        sudo rm -rf /var/www/msa
        deploy="y"
    else
        deploy="n"
    fi
else
    echo "First time deploying app ..."
fi

if [ "$deploy" == "y" ]
then
    echo -e "\033[0;33mDeploying...\033[0m"
    start="$(date +%s)"

    cd $appDir
    npm run build

    sudo mkdir /var/www/msa
    sudo mv $appDir/build/* /var/www/msa/
    rmdir build

    links=/var/www/msa/.htaccess
    sudo touch $links
    echo "Options -MultiViews" > $links
    echo "RewriteEngine On" >> $links
    echo -e "RewriteCond %{REQUEST_FILENAME} !-f" >> $links
    echo -e "RewriteRule ^ index.html [QSA,L]" >> $links

    echo "Enabling site ..."
    sudo a2ensite msa.conf

    sudo systemctl restart apache2.service

    runtime=$[ $(date +%s) - $start ]
    echo -e "\033[0;32mDeployed successfully in ${runtime} seconds!\033[0m"
else 
    echo -e "\033[0;33mDeployment halted!\033[0m"
fi 