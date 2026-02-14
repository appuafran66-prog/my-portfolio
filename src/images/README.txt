📸 HOW TO ADD YOUR PROFILE IMAGE

Currently showing: 3D Animated Torus

To display your profile picture instead:

STEP 1: Add your image to this folder
- Place your image file here: src/images/
- Name it: anas.jpg (or anas.png)

STEP 2: Update App.js
- Open: src/App.js
- Add this import at the top (around line 2):
  import anasImage from './images/anas.jpg';

- Replace the 3D Canvas section (around line 313) with:
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: { xs: '300px', md: '500px' }
    }}
  >
    <Box
      sx={{
        width: { xs: '250px', md: '400px' },
        height: { xs: '250px', md: '400px' },
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(0, 229, 255, 0.5), 0 0 100px rgba(255, 0, 255, 0.3)',
        border: '3px solid #00e5ff',
      }}
    >
      <img
        src={anasImage}
        alt="Anas"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  </Box>

Image Recommendations:
- Format: JPG or PNG
- Size: Square (1:1 ratio)
- Resolution: 500x500 pixels or larger
- File size: Under 2MB

Your portfolio is working perfectly with the 3D torus for now!
