import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
} from '@mui/material';

const SolarCalculator = () => {
  // City data
  const cities = [
    { name: 'Milan', irradiance: 4.45 },
    { name: 'Venice', irradiance: 4.21 },
    { name: 'Rome', irradiance: 4.97 },
    { name: 'Florence', irradiance: 4.51 },
    { name: 'Bologna', irradiance: 4.58 },
  ];

  // State variables
  const [annualEnergy, setAnnualEnergy] = useState('');
  const [monthlyEnergy, setMonthlyEnergy] = useState('');
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  const [roofArea, setRoofArea] = useState('');
  const [panelArea, setPanelArea] = useState('');
  const [panelWattage, setPanelWattage] = useState('');
  const [numberOfPanels, setNumberOfPanels] = useState('');

  // State to hold calculation results
  const [results, setResults] = useState(null);

  // Find the irradiance value for the selected city
  const irradiance = cities.find(city => city.name === selectedCity)?.irradiance;

  // Handlers to manage mutual exclusivity
  const handleAnnualChange = (e) => {
    setAnnualEnergy(e.target.value);
    if (e.target.value !== '') {
      setMonthlyEnergy('');
    }
  };

  const handleMonthlyChange = (e) => {
    setMonthlyEnergy(e.target.value);
    if (e.target.value !== '') {
      setAnnualEnergy('');
    }
  };

  // Calculate and set results
  const handleCalculate = () => {
    // Validate inputs
    if (
      (!annualEnergy && !monthlyEnergy) ||
      !roofArea ||
      !panelArea ||
      !panelWattage ||
      !numberOfPanels
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const totalAnnualEnergy = annualEnergy
      ? parseFloat(annualEnergy)
      : parseFloat(monthlyEnergy) * 12;

    const totalPanelArea = parseFloat(panelArea) * parseInt(numberOfPanels, 10);
    const canAccommodate = totalPanelArea <= parseFloat(roofArea) ? 'Yes' : 'No';

    const totalPanelWattage = parseFloat(panelWattage) * parseInt(numberOfPanels, 10);
    const estimatedAnnualProduction = irradiance * totalPanelArea * 365 * 0.75; // Assuming 75% efficiency

    setResults({
      totalAnnualEnergy,
      selectedCity,
      irradiance,
      roofArea,
      panelArea,
      panelWattage,
      numberOfPanels,
      canAccommodate,
      totalPanelWattage,
      estimatedAnnualProduction: estimatedAnnualProduction.toFixed(2),
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Solarization Tool
      </Typography>
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
        {/* Input Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            {/* Annual and Monthly Energy Input */}
            <Box mb={3}>
              <Typography variant="body1" gutterBottom>
                Enter your annual or monthly energy consumption:
              </Typography>
              <TextField
                label="Annual Energy (kWh)"
                type="number"
                value={annualEnergy}
                onChange={handleAnnualChange}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Monthly Energy (kWh)"
                type="number"
                value={monthlyEnergy}
                onChange={handleMonthlyChange}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>

            {/* City Selection */}
            <Box mb={3}>
              <Typography variant="body1" gutterBottom>
                Select your city:
              </Typography>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                fullWidth
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Roof Area, Panel Area, Panel Wattage, and Number of Panels */}
            <Box mb={3}>
              <Typography variant="body1" gutterBottom>
                Enter your roof details:
              </Typography>
              <TextField
                label="Roof Area (m²)"
                type="number"
                value={roofArea}
                onChange={(e) => setRoofArea(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Panel Area (m²)"
                type="number"
                value={panelArea}
                onChange={(e) => setPanelArea(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Panel Wattage (W)"
                type="number"
                value={panelWattage}
                onChange={(e) => setPanelWattage(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Number of Panels"
                type="number"
                value={numberOfPanels}
                onChange={(e) => setNumberOfPanels(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>

            {/* Calculate Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              fullWidth
            >
              Calculate
            </Button>
          </Paper>
        </Grid>

        {/* Results Display */}
        {results && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Calculation Results
              </Typography>
              <Box mb={2}>
                <Typography variant="subtitle1">
                  Total Annual Energy Consumption: {results.totalAnnualEnergy} kWh
                </Typography>
                <Typography variant="subtitle1">
                  Selected City: {results.selectedCity}
                </Typography>
                <Typography variant="subtitle1">
                  Irradiance: {results.irradiance} kWh/m²/day
                </Typography>
                <Typography variant="subtitle1">
                  Roof Area: {results.roofArea} m²
                </Typography>
                <Typography variant="subtitle1">
                  Panel Area: {results.panelArea} m²
                </Typography>
                <Typography variant="subtitle1">
                  Panel Wattage: {results.panelWattage} W
                </Typography>
                <Typography variant="subtitle1">
                  Number of Panels: {results.numberOfPanels}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">
                  Can the system be accommodated on the roof: {results.canAccommodate}
                </Typography>
              </Box>
              {results.canAccommodate === 'Yes' && (
                <Box>
                  <Typography variant="subtitle1">
                    Total Panel Area: {parseFloat(panelArea) * parseInt(results.numberOfPanels, 10)} m²
                  </Typography>
                  <Typography variant="subtitle1">
                    Total Panel Wattage: {results.totalPanelWattage} W
                  </Typography>
                 
                </Box>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SolarCalculator;
