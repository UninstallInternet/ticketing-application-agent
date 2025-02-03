// src/pages/TicketPage.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';

const TicketPage = () => {
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      short_description: shortDesc,
      long_description: longDesc,
    };

    try {
      const response = await fetch('http://localhost:8000/score/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Record a New Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Short Description"
              variant="outlined"
              margin="normal"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Long Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              required
            />
            <Box sx={{ mt: 2, position: 'relative' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Ticket'}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </form>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {result && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Quality Score: {result.characteristic_score}
              </Typography>
              <Typography variant="subtitle1">
                Assigned Cluster: {result.top_cluster}
              </Typography>
              {result.matched_elements && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">Matched Elements:</Typography>
                  <ul>
                    {Object.entries(result.matched_elements).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TicketPage;
