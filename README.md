A view counter for pages in Bookstack

<img width="1859" height="860" alt="image" src="https://github.com/user-attachments/assets/84c88f10-44c5-4109-b86e-6ba8d3e70f94" />


📥 Installation

Follow these steps to install the view counter on your BookStack instance.
1. Move Public Assets

Copy the backend script and JavaScript file to your public directory, then create the storage folder.
``` Bash
# Move files to public directory
cp counter.php view-counter.js /var/www/bookstack/public/

# Create the storage directory
mkdir /var/www/bookstack/public/view_counts
```

2. Update View Template

Copy the blade template to the BookStack views directory.
``` Bash
cp show-blade.php /var/www/bookstack/resources/views/pages/
```

3. Set Permissions

Ensure the web server (www-data) has ownership and the correct read/write permissions.
``` Bash
# Set ownership
sudo chown -R www-data:www-data /var/www/bookstack/public/view_counts
sudo chown -R www-data:www-data /var/www/bookstack/resources/views/pages/show-blade.php

# Set access permissions (755)
sudo chmod -R 755 /var/www/bookstack/public/view_counts
sudo chmod -R 755 /var/www/bookstack/resources/views/pages/show-blade.php
```
  

