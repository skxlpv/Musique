const createThumbnail = (file) => {
  // Check if file is a valid Blob/File object
  if (!(file instanceof Blob)) {
    console.error('Invalid file object provided');
    return Promise.reject('Invalid file object');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const ext = file.name.split('.').pop().toLowerCase();

        // For images - create actual thumbnail
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
          const img = new Image();
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Fixed thumbnail size
              const size = 150;
              const scale = Math.min(size / img.width, size / img.height);
              const width = Math.round(img.width * scale);
              const height = Math.round(img.height * scale);

              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);

              resolve(canvas.toDataURL('image/jpeg', 0.8));
            } catch (err) {
              console.error('Error creating image thumbnail:', err);
              reject(err);
            }
          };
          img.onerror = (err) => {
            console.error('Error loading image:', err);
            reject(err);
          };
          img.src = e.target.result;
        }
        // For non-images - create icon-based thumbnail
        else {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = 150;
          canvas.height = 150;

          // Background
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // File icon
          ctx.strokeStyle = '#666';
          ctx.lineWidth = 2;
          ctx.strokeRect(35, 25, 80, 100);

          // File type text
          ctx.fillStyle = '#333';
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(ext.toUpperCase(), 75, 85);

          // Add specific icon based on file type
          if (['mp3', 'wav'].includes(ext)) {
            ctx.fillText('♪', 75, 115);
          } else if (['pdf', 'doc', 'docx'].includes(ext)) {
            ctx.fillText('📄', 75, 115);
          }

          resolve(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        console.error('Error in thumbnail creation:', err);
        reject(err);
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      reject(error);
    };

    // Use try-catch to handle potential errors
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error reading file:', err);
      reject(err);
    }
  });
};

export { createThumbnail };
