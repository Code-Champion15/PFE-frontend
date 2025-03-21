import { Card, CardContent, Typography } from "@mui/material"

const CardInfo = ({ title, value}) => {
    return (
        <Card sx={{ minWidth: 100, textAlign: "Center", p:2}}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4">{value}</Typography>
            </CardContent>
        </Card>
    );
};
export default CardInfo;