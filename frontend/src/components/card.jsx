import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


export default function MyCard({ title = "", content = "", id=""}) {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div className="m-2 text-black p-1 align-center inline-flex justify-center ">
      <Card sx={{ Width: 345 }}>
        <CardContent
          className="overflow-hidden min-w-full"
          sx={{ maxHeight: 150 }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <p dangerouslySetInnerHTML={{__html: content}} />
          </Typography>
        </CardContent>
        <CardActions>
          <Button  size="small">Share</Button>
          <Button onClick={handleMoreClick} size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>  
  );
}
