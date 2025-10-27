import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../controllers/Authcontrollers';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
export default function History() {

    const { getHistoryOfUser } = useContext(Authcontext);

    const [meetings, setMeetings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError('');
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Failed to load meeting history');
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [getHistoryOfUser])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <div>
            <IconButton onClick={() => {
                routeTo("/home")
            }}>
                <HomeIcon />
            </IconButton >
            
            {loading && (
                <Typography>Loading meeting history...</Typography>
            )}
            
            {error && (
                <Typography color="error">{error}</Typography>
            )}
            
            {!loading && !error && meetings.length === 0 && (
                <Typography>No meeting history found.</Typography>
            )}
            
            {!loading && !error && meetings.length > 0 && meetings.map((e, i) => {
                return (
                    <Card key={i} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {e.meetingCode}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Date: {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}