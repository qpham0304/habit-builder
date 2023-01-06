import React, { useState } from 'react'
import { useTimer } from 'react-timer-hook';
import { Button, Box, Modal, Typography, Stack } from '@mui/material';
import FlipNumbers from 'react-flip-numbers';

function MyTimer(props) {
  const { autoStart, expiryTimestamp, sessionLength } = props
  const {
    seconds, minutes, hours, days, isRunning, start, pause, resume, restart,
  } = useTimer({ autoStart, expiryTimestamp, onExpire: () =>  alert("Session ended") });
  
  const reset = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sessionLength);
    restart(time)
    pause()
  }

  return (
    <Stack sx={{gap: '1rem', textAlign: 'center'}}>
      <Typography variant='h5'>Focus Timer</Typography>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', fontFamily: 'helvetica', fontSize: '30px'}}>
        <FlipNumbers height={50} width={45} color="#007aff" play={true} perspective={300} numbers={`${days < 10 ? '0' : ''}${days}`} />:
        <FlipNumbers height={50} width={45} color="#007aff" play={true} perspective={300} numbers={`${hours < 10 ? '0' : ''}${hours}`} />:
        <FlipNumbers height={50} width={45} color="#007aff" play={true} perspective={300} numbers={`${minutes < 10 ? '0' : ''}${minutes}`} />:
        <FlipNumbers height={50} width={45} color="#007aff" play={true} perspective={300} numbers={`${seconds < 10 ? '0' : ''}${seconds}`} />
      </Box>
      <Typography>{isRunning ? 'Stay Focus' : 'Session ended'}</Typography>
      <Box sx={{ display:'flex', gap: '1rem', justifyContent: 'center'}}>
        <Button variant='contained' color='primary' onClick={resume}>Resume</Button>
        <Button variant='contained' color='primary' onClick={pause}>Pause</Button>
        <Button variant='contained' color='primary' onClick={reset}>Restart</Button>
      </Box>
    </Stack>
  );
}

function Focus() {
  const time = new Date();
  const [sessionLength, setSessionLength] = useState(1500)
  time.setSeconds(time.getSeconds() + sessionLength);
  
  return (
    <Stack display={'flex'} >
      <Box mt={'8rem'}>
        <MyTimer autoStart={false} expiryTimestamp={time} sessionLength={sessionLength}/>
      </Box>
    </Stack>
  )
}

export default Focus