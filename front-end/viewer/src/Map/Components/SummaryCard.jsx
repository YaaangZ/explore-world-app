import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const SummaryCard = ({ data, onSelect }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={index} onClick={() => onSelect(item)}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="div">
                {item.name.common} 
              </Typography>
              {item.flags.svg && (
                <CardMedia
                  component="img"
                  height="100"
                  image={item.flags.svg}
                  alt={`Flag of ${item.name.common}`}
                />
              )}
              {!item.flags.svg && item.flags.alt && (
                <CardMedia
                  component="img"
                  height="140"
                  image={item.flags.alt}
                  alt={`Flag of ${item.name.common}`}
                />
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCard;

