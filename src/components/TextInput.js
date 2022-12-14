import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '../firebase';
import { useState, useEffect } from 'react';
import "./TextInput.css"

const theme = createTheme();

export default function TextInput() {
  const [name, setName] = useState('')
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [answer3, setAnswer3] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // need to save database
    addDoc(collection(db, "posts"), {
      username: name,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      predict_count: 0,
      timestamp: serverTimestamp(),
    })
    setName('')
    setAnswer1('')
    setAnswer2('')
    setAnswer3('')
  };

  useEffect(() => {
    const disabled = name === '' || answer1 === '' || answer2 === '' || answer3 === ''
    setDisabled(disabled)
  }, [name,answer1,answer2,answer3]);

  return (
    <ThemeProvider theme={theme} className="text_input">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <QuizIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            質問
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="名前"
              name="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="質問1"
              name="question1"
              onChange={(e) => setAnswer1(e.target.value)}
              value={answer1}
            //   autoComplete="email"
            //   autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="question2"
              label="質問2"
              type="text"
              id="text"
              onChange={(e) => setAnswer2(e.target.value)}
              value={answer2}
            //   autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="question3"
              label="質問3"
              type="text"
              id="text"
              onChange={(e) => setAnswer3(e.target.value)}
              value={answer3}
            //   autoComplete="current-password"
            />
            <div className='button'>
              <Button
                variant='outlined'
                // fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Skip
              </Button>
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                disabled={disabled}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}