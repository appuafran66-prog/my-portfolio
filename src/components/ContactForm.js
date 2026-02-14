import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Send, CheckCircle } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      // IMPORTANT: Replace these with your actual EmailJS credentials
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'anasama495@gmail.com', // Your email
        },
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setOpenSnackbar(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        p: { xs: 3, md: 4 },
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: { xs: '16px', md: '20px' },
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: '#00e5ff',
          fontWeight: 600,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', md: '1.75rem' },
        }}
      >
        Send Me a Message
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Name Field */}
        <TextField
          fullWidth
          name="name"
          label="Your Name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#00e5ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00e5ff',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
            },
          }}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          name="email"
          label="Your Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#00e5ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00e5ff',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
            },
          }}
        />

        {/* Subject Field */}
        <TextField
          fullWidth
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#00e5ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00e5ff',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
            },
          }}
        />

        {/* Message Field */}
        <TextField
          fullWidth
          name="message"
          label="Message"
          multiline
          rows={6}
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={
            errors.message ||
            `${formData.message.length}/1000 characters`
          }
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#00e5ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00e5ff',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiFormHelperText-root': {
              color: errors.message ? '#f87171' : 'rgba(255, 255, 255, 0.5)',
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(45deg, #00e5ff, #0099cc)',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, #0099cc, #00e5ff)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0, 229, 255, 0.4)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </Box>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submitStatus === 'success' ? 'success' : 'error'}
          icon={submitStatus === 'success' ? <CheckCircle /> : undefined}
          sx={{
            width: '100%',
            background:
              submitStatus === 'success'
                ? 'rgba(74, 222, 128, 0.1)'
                : 'rgba(248, 113, 113, 0.1)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${
              submitStatus === 'success'
                ? 'rgba(74, 222, 128, 0.3)'
                : 'rgba(248, 113, 113, 0.3)'
            }`,
            color: '#fff',
            '& .MuiAlert-icon': {
              color: submitStatus === 'success' ? '#4ade80' : '#f87171',
            },
          }}
        >
          {submitStatus === 'success'
            ? 'Message sent successfully! I\'ll get back to you soon.'
            : 'Failed to send message. Please try again or email me directly.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
