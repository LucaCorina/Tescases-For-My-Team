import React, { useState, useRef, useEffect } from 'react'
import './MainPage.css'
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';


export default function MainPage() {

    const useStyles = makeStyles(() => ({
        formControl: {
          minWidth: 120,
          maxWidth: 300,
        },
        chips: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        chip: {
          margin: 2,
        }
      }));
    const classes = useStyles();  
    const [visibleU, setVisibleU] = React.useState(false);
    const [token, setAuthToken] = useState('');
    const [flats, updateFlat] = useState([]);
    const { state, pathname } = useLocation();
    const [selectedFlat, setSelectedFlat] = useState({});
    const [Name, setName] = useState('');
    const [City, setCity] = useState('');
    const [Street, setStreet] = useState('');
    const [County, setCounty] = useState('');
    const btnStyle = { margin: '8px 2px' };
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleCity = (e) => {
        setCity(e.target.value);
    };
    const handleStreet = (e) => {
        setStreet(e.target.value);
    };
    const handleCounty = (e) => {
        setCounty(e.target.value);
    };

 useEffect(function effectFunction() {
        async function fetchFlat() {
            const response = await fetch('http://localhost:3600/flats/getFlatByUserId', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }

            }).then()
            const json = await response.json();
            updateFlat(json);

        }
        fetchFlat();
    }, []);

    const onUpdate = async (e, selectedFlat) => {
        let { Flat_ID, ...payload } = selectedFlat;
        e.preventDefault();
        const flatCall = await fetch('http://localhost:3600/flats/updateFlat', {
            method: 'PUT',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({Flat_ID: Flat_ID, Name: Name, City: City, Street: Street, County: County})
        });

    if (flatCall){
        async function fetchFlat() {
            const response = await fetch('http://localhost:3600/flats/getFlatByUserId', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }

            }).then()
            const json = await response.json();
            updateFlat(json);

        }
        fetchFlat();
    }
    }        

    return (
        <div>
        <div className='home'>
        <div className='featuredItem'>
        <div className='flat'>
        <h2>This flat</h2>
        </div>   

        <div className="container">

<table className="table table-striped table-bordered" >
    <thead >
        <tr>
            <th >Name</th>
            <th>City</th>
            <th>Street</th>
            <th>County</th>
        </tr>
    </thead>
    <tbody>
          {flats && flats.map((flat, i) =>
            <tr key={i}>
                <td >{flat.Name}</td>
                <td>{flat.City}</td>
                <td>{flat.Street}</td>
                <td>{flat.County}</td>
                <td><Button color="primary" variant='outlined' onClick={() => {setSelectedFlat(flat); setVisibleU(true) }}>Modify info</Button></td> 
            </tr> 
          )}
    </tbody>
</table>
</div>
{ visibleU && (<div className='featuredItem update' visiblility={visibleU} > 
                <div>
                    <h2>Update flat</h2>
                </div>
                <TextField id="outlined-basic" label="ID" variant="standard"
                fullWidth sx={{ display: 'none' }} value={selectedFlat.Flat_ID}/>
                <TextField id="outlined-basic" label="New name" variant="standard"
                fullWidth style={btnStyle} onChange={handleName} />
                <TextField id="outlined-basic" label="New city" variant="standard"
                fullWidth style={btnStyle} onChange={handleCity} />
                <TextField id="outlined-basic" label="New street" variant="standard"
                fullWidth style={btnStyle} onChange={handleStreet}/>
                <TextField id="outlined-basic" label="New county" variant="standard"
                fullWidth style={btnStyle} onChange={handleCounty}/>
                <Button type='submit' variant='contained' color="primary" style={btnStyle} onClick={(e) => onUpdate(e, selectedFlat)}>Update flat
                </Button>
                </div>

    )}
</div>

</div>
         
            </div>

    )
}
