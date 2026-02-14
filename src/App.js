import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import anasImage from './images/anas.png';
import Typed from 'typed.js';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  GitHub,
  LinkedIn,
  Email,
  Code,
  Rocket,
  EmojiObjects,
  Language,
  Storage,
  DataObject,
  Javascript,
  Terminal,
  Web,
  IntegrationInstructions,
  VerifiedUser,
  School,
  Article
} from '@mui/icons-material';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    secondary: {
      main: '#ff00ff',
    },
    background: {
      default: '#0a0e27',
      paper: '#1a1e3e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

// 3D Rotating Neon Torus Component
function NeonTorus() {
  const torusRef = useRef();

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.01;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[2, 0.6, 16, 100]} />
      <MeshDistortMaterial
        color="#00e5ff"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#ff00ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Scroll-Based 3D Model Component
function ScrollCube({ scrollY }) {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      // Rotate based on scroll position
      cubeRef.current.rotation.x = scrollY * 0.002;
      cubeRef.current.rotation.y = scrollY * 0.003;
      cubeRef.current.rotation.z = scrollY * 0.001;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <MeshDistortMaterial
        color="#ff00ff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00e5ff"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const typedElement = useRef(null);
  const typedRoleElement = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typed.js animation for role
  useEffect(() => {
    const typedRole = new Typed(typedRoleElement.current, {
      strings: [
        'Full Stack Developer',
        'Laravel Developer',
        'React.js Developer',
        'Python Developer',
        'Full-Stack Developer at WebXKey'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typedRole.destroy();
    };
  }, []);

  // Typed.js animation for bio
  useEffect(() => {
    const typedBio = new Typed(typedElement.current, {
      strings: [
        'Passionate about building web applications and learning new technologies.',
        'Contributing to real-world projects and enhancing my coding skills.',
        'Eager to grow as a developer and take on challenging projects.',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 3000,
      loop: true,
      showCursor: false,
    });

    return () => {
      typedBio.destroy();
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  // Mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#00e5ff' }}>
        Anas
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item} onClick={() => scrollToSection(item.toLowerCase())}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const projects = [
    {
      title: 'FamChat - Real-time Chat App',
      description: 'Developed real-time chat functionalities using PHP, Blade, CSS, and JavaScript. Designed a responsive user interface to enhance user experience across devices.',
      tech: ['PHP', 'Blade', 'JavaScript', 'CSS', 'MySQL'],
      color: '#00e5ff',
      date: 'January 2026'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Created a full-stack e-commerce platform with backend logic and integrated payment systems. Features include product management, shopping cart, and secure checkout.',
      tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
      color: '#ff00ff',
      date: '2026'
    },
    {
      title: 'Space Shooter Game',
      description: 'Implemented an interactive Space Shooter game using JavaScript and HTML5, focusing on engaging mechanics, smooth animations, and responsive controls.',
      tech: ['JavaScript', 'HTML5', 'CSS', 'Canvas API'],
      color: '#00ff88',
      date: '2025'
    },
    {
      title: 'WebXKey Development Projects',
      description: 'Contributing to real-world web development projects as a Remote Full-Stack Developer. Applying best practices in Laravel, React.js, and modern web technologies.',
      tech: ['Laravel', 'React.js', 'PHP', 'JavaScript'],
      color: '#ffaa00',
      date: 'Present'
    }
  ];

  const skills = [
    { name: 'Laravel', icon: <Code /> },
    { name: 'PHP', icon: <DataObject /> },
    { name: 'React.js', icon: <Web /> },
    { name: 'JavaScript', icon: <Javascript /> },
    { name: 'Python', icon: <Terminal /> },
    { name: 'MySQL', icon: <Storage /> },
    { name: 'Node.js', icon: <IntegrationInstructions /> },
    { name: 'Git', icon: <GitHub /> },
    { name: 'Full-Stack Development', icon: <Language /> },
    { name: 'HTML5', icon: <Code /> },
    { name: 'CSS', icon: <Article /> },
    { name: 'Blade', icon: <Web /> },
    { name: 'Java', icon: <DataObject /> },
    { name: 'C#', icon: <Code /> },
    { name: 'SQL', icon: <Storage /> },
  ];

  const certifications = [
    { name: 'React', url: 'https://www.testdome.com/certificates/99c373750b34426aba3df2a5750a1da8', icon: <Web /> },
    { name: 'Node.js', url: 'https://www.testdome.com/certificates/73bdef00f6234f6e9d5dcad4b4a696f9', icon: <IntegrationInstructions /> },
    { name: 'Python', url: 'https://www.testdome.com/certificates/31df35f9abef48e39aefb711cb64b49a', icon: <Terminal /> },
    { name: 'Java', url: 'https://www.testdome.com/certificates/4231e026861b43a4816241f84f0b8bcc', icon: <DataObject /> },
    { name: 'PHP', url: 'https://www.testdome.com/certificates/4fdd67e284884036aec6c723dc9a885d', icon: <Code /> },
    { name: 'C#', url: 'https://www.testdome.com/certificates/2d82de79577644edaea1cda6e3b032a1', icon: <DataObject /> },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <AppBar position="fixed" sx={{ background: 'rgba(10, 14, 39, 0.95)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #00e5ff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Anas
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {menuItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: '#fff', mx: 1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Hero Section */}
        <Box
          id="home"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1e3e 50%, #2a2e5e 100%)',
            position: 'relative',
            overflow: 'hidden',
            pt: 8
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ zIndex: 1, position: 'relative' }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '5rem' },
                      mb: 3,
                      background: 'linear-gradient(45deg, #00e5ff, #ff00ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Hi, I'm Anas
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 4,
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '1.75rem', md: '2.5rem' },
                      minHeight: { xs: '70px', md: '90px' }
                    }}
                  >
                    <span ref={typedRoleElement}></span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 5,
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      lineHeight: 2,
                      minHeight: { xs: '90px', md: '70px' }
                    }}
                  >
                    <span ref={typedElement}></span>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => scrollToSection('projects')}
                      sx={{
                        background: 'linear-gradient(45deg, #00e5ff, #0099cc)',
                        color: '#fff',
                        px: 5,
                        py: 2,
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0099cc, #00e5ff)',
                        }
                      }}
                    >
                      View My Work
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => scrollToSection('contact')}
                      sx={{
                        borderColor: '#00e5ff',
                        color: '#00e5ff',
                        px: 5,
                        py: 2,
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: '#ff00ff',
                          color: '#ff00ff',
                        }
                      }}
                    >
                      Get In Touch
                    </Button>
                  </Box>
                  <Box sx={{ mt: 5, display: 'flex', gap: 3 }}>
                    <IconButton 
                      sx={{ color: '#00e5ff', '&:hover': { color: '#ff00ff' }, fontSize: '2rem' }}
                      onClick={() => window.open('https://github.com/appuafran66-prog', '_blank')}
                      aria-label="GitHub"
                    >
                      <GitHub fontSize="large" />
                    </IconButton>
                    <IconButton 
                      sx={{ color: '#00e5ff', '&:hover': { color: '#ff00ff' }, fontSize: '2rem' }}
                      onClick={() => window.open('https://www.linkedin.com/in/mohamed-anas-731361394', '_blank')}
                      aria-label="LinkedIn"
                    >
                      <LinkedIn fontSize="large" />
                    </IconButton>
                    <IconButton 
                      sx={{ color: '#00e5ff', '&:hover': { color: '#ff00ff' }, fontSize: '2rem' }}
                      onClick={() => window.location.href = 'mailto:anasama495@gmail.com'}
                      aria-label="Email"
                    >
                      <Email fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: { xs: '350px', md: '550px' }, 
                    width: '100%' 
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: '300px', md: '450px' },
                      height: { xs: '300px', md: '450px' },
                    }}
                  >
                    {/* Glowing border effect */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #00e5ff, #ff00ff, #00e5ff)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient 3s ease infinite',
                        '@keyframes gradient': {
                          '0%, 100%': { backgroundPosition: '0% 50%' },
                          '50%': { backgroundPosition: '100% 50%' },
                        },
                        filter: 'blur(8px)',
                        opacity: 0.8,
                      }}
                    />
                    {/* Image container */}
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid #0a0e27',
                        boxShadow: '0 0 60px rgba(0, 229, 255, 0.6), 0 0 100px rgba(255, 0, 255, 0.4)',
                      }}
                    >
                      <img
                        src={anasImage}
                        alt="Anas"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center center',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Box
          id="about"
          sx={{
            py: 12,
            background: 'linear-gradient(180deg, #0a0e27 0%, #1a1e3e 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 8,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #00e5ff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About Me
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.4)',
                      boxShadow: '0 10px 40px rgba(0, 229, 255, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 5 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto 24px',
                        background: 'linear-gradient(45deg, #00e5ff, #ff00ff)',
                      }}
                    >
                      <Code fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 3, color: '#00e5ff', fontSize: '1.5rem' }}>
                      Developer
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                      Currently working as Remote Full-Stack Developer at WebXKey, contributing to real-world projects using Laravel, PHP, and React.js.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 0, 255, 0.4)',
                      boxShadow: '0 10px 40px rgba(255, 0, 255, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 5 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto 24px',
                        background: 'linear-gradient(45deg, #ff00ff, #00e5ff)',
                      }}
                    >
                      <EmojiObjects fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 3, color: '#ff00ff', fontSize: '1.5rem' }}>
                      Problem Solver
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                      Passionate about learning new technologies and applying best practices in web development. Building full-stack applications with modern tools.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(0, 255, 136, 0.4)',
                      boxShadow: '0 10px 40px rgba(0, 255, 136, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 5 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto 24px',
                        background: 'linear-gradient(45deg, #00ff88, #00e5ff)',
                      }}
                    >
                      <Rocket fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 3, color: '#00ff88', fontSize: '1.5rem' }}>
                      Fast Learner
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                      BSc Computer Software Engineering student at London Metropolitan University. Eager to connect with tech professionals and grow as a developer.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Skills Section */}
            <Box sx={{ mt: 10 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 6 }}>
                <Code 
                  sx={{ 
                    fontSize: '3rem', 
                    color: '#00e5ff',
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }} 
                />
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: '#00e5ff', fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  Skills & Technologies
                </Typography>
                <Code 
                  sx={{ 
                    fontSize: '3rem', 
                    color: '#00e5ff',
                    animation: 'float 3s ease-in-out infinite 0.5s',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }} 
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  '@keyframes slideIn': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    icon={React.cloneElement(skill.icon, { 
                      style: { color: 'inherit' } 
                    })}
                    label={skill.name}
                    sx={{
                      background: 'rgba(0, 229, 255, 0.1)',
                      color: '#00e5ff',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      fontSize: '1.1rem',
                      padding: '24px 12px',
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                      '& .MuiChip-icon': {
                        color: '#00e5ff',
                        fontSize: '1.5rem',
                      },
                      '&:hover': {
                        background: 'rgba(255, 0, 255, 0.1)',
                        borderColor: 'rgba(255, 0, 255, 0.5)',
                        color: '#ff00ff',
                        transform: 'translateY(-5px) scale(1.05)',
                        transition: 'all 0.3s ease',
                        '& .MuiChip-icon': {
                          color: '#ff00ff',
                        },
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Certifications Section */}
            <Box sx={{ mt: 10 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 6 }}>
                <School 
                  sx={{ 
                    fontSize: '3rem', 
                    color: '#ff00ff',
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }} 
                />
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: '#ff00ff', fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  Certifications
                </Typography>
                <VerifiedUser 
                  sx={{ 
                    fontSize: '3rem', 
                    color: '#ff00ff',
                    animation: 'float 3s ease-in-out infinite 0.5s',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }} 
                />
              </Box>
              <Grid container spacing={3} justifyContent="center">
                {certifications.map((cert, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 0, 255, 0.5)',
                          boxShadow: '0 10px 30px rgba(255, 0, 255, 0.3)',
                        }
                      }}
                      onClick={() => window.open(cert.url, '_blank')}
                    >
                      <CardContent sx={{ py: 3 }}>
                        <Box
                          sx={{
                            fontSize: '3rem',
                            color: '#ff00ff',
                            mb: 1.5,
                            display: 'flex',
                            justifyContent: 'center',
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%, 100%': { transform: 'scale(1)' },
                              '50%': { transform: 'scale(1.15)' },
                            },
                          }}
                        >
                          {React.cloneElement(cert.icon, { 
                            sx: { fontSize: 'inherit' } 
                          })}
                        </Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#ff00ff',
                            fontSize: '1rem',
                            fontWeight: 600
                          }}
                        >
                          {cert.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                          <VerifiedUser sx={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)' }} />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.75rem'
                            }}
                          >
                            TestDome
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="body2"
                align="center"
                sx={{ 
                  mt: 3,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                Additional: Introduction to Python, SQL, and Git
              </Typography>
            </Box>

            {/* Education & Location Section */}
            <Box sx={{ mt: 8 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          color: '#00e5ff',
                          fontWeight: 600 
                        }}
                      >
                        🎓 Education
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#fff',
                          mb: 1
                        }}
                      >
                        London Metropolitan University
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          mb: 1
                        }}
                      >
                        Bachelor of Science - Computer Software Engineering
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        August 2024 - September 2026
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          color: '#00e5ff',
                          fontWeight: 600 
                        }}
                      >
                        📍 Location & Experience
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          mb: 2
                        }}
                      >
                        <strong>Location:</strong> Kolonnawa, Western Province, Sri Lanka
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          mb: 2
                        }}
                      >
                        <strong>Current Role:</strong> Remote Full-Stack Developer
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <strong>Company:</strong> WebXKey
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Interactive 3D Model Section */}
            <Box sx={{ mt: 10 }}>
              <Typography
                variant="h4"
                align="center"
                sx={{ 
                  mb: 2, 
                  color: '#ff00ff',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Interactive 3D Experience
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Scroll to interact with the 3D model below
              </Typography>
              <Box 
                sx={{ 
                  height: { xs: '300px', md: '400px' }, 
                  width: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 0, 255, 0.3)',
                  boxShadow: '0 0 40px rgba(255, 0, 255, 0.2)',
                }}
              >
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
                  <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff00ff" />
                  <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ff88" />
                  <ScrollCube scrollY={scrollY} />
                  <OrbitControls enableZoom={true} enablePan={false} />
                </Canvas>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Projects Section */}
        <Box
          id="projects"
          sx={{
            py: 12,
            background: 'linear-gradient(180deg, #1a1e3e 0%, #0a0e27 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 8,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #ff00ff, #00e5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Featured Projects
            </Typography>
            <Grid container spacing={6}>
              {projects.map((project, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${project.color}`,
                        boxShadow: `0 10px 40px ${project.color}66`,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: project.color,
                            fontWeight: 600,
                            fontSize: '1.5rem'
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Chip
                          label={project.date}
                          size="small"
                          sx={{
                            background: `${project.color}22`,
                            color: project.color,
                            border: `1px solid ${project.color}44`,
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 4,
                          color: 'rgba(255, 255, 255, 0.7)',
                          lineHeight: 2,
                          fontSize: '1.05rem'
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {project.tech.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
                            size="small"
                            sx={{
                              background: `${project.color}22`,
                              color: project.color,
                              border: `1px solid ${project.color}44`,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        sx={{ color: project.color }}
                      >
                        View Code
                      </Button>
                      <Button
                        size="small"
                        sx={{ color: project.color }}
                      >
                        Live Demo
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box
          id="contact"
          sx={{
            py: 12,
            background: 'linear-gradient(180deg, #0a0e27 0%, #1a1e3e 100%)',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 4,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #00e5ff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Let's Work Together
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 8,
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              Have a project in mind? Let's create something amazing together!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                onClick={() => window.location.href = 'mailto:anasama495@gmail.com'}
                sx={{
                  background: 'linear-gradient(45deg, #00e5ff, #0099cc)',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0099cc, #00e5ff)',
                  }
                }}
              >
                Email Me
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHub />}
                onClick={() => window.open('https://github.com/appuafran66-prog', '_blank')}
                sx={{
                  borderColor: '#ff00ff',
                  color: '#ff00ff',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: '#00e5ff',
                    color: '#00e5ff',
                  }
                }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<LinkedIn />}
                onClick={() => window.open('https://www.linkedin.com/in/mohamed-anas-731361394', '_blank')}
                sx={{
                  borderColor: '#00e5ff',
                  color: '#00e5ff',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: '#ff00ff',
                    color: '#ff00ff',
                  }
                }}
              >
                LinkedIn
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            background: 'rgba(10, 14, 39, 0.95)',
            borderTop: '1px solid rgba(0, 229, 255, 0.2)',
          }}
        >
          <Container>
            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              © 2026 Anas. Built with React, Material-UI & Three.js
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
