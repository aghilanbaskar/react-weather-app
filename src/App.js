import React, { useEffect, useState } from "react";
import Weather from './components/weather';
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      if (  ( Array.isArray(lat) || Array.isArray(long) )  ) {
        return
      }

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
    }
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
          {(typeof data.main != 'undefined') ? (
            <Container>
              <Grid>
                <Grid.Row>
                  <Weather weatherData={data}/>
                </Grid.Row>
              </Grid>
            </Container>
          ): (
            <div>
              <Dimmer active>
                <Loader>Loading..</Loader>
              </Dimmer>
          </div>
        )}
    </div>
  );
}

export default App;
