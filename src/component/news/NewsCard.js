import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState, useEffect } from 'react';
import { Badge } from 'antd';
import LoadingBar from 'react-top-loading-bar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './news.css';
import Loading from './Loading';



export default function MultiActionAreaCard(props) {

    const [advice, setAdvice] = useState([]);
    const [Result, setResult] = useState(0);
    const [load, setLoad] = useState(0);
    const [name, setName] = React.useState("general");
    const [progress, setProgress] = useState(0)
    const [value, setValue] = React.useState(0);


    //Fatch data.............

    useEffect(() => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1&category=${name}`;
        // const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-01-22&sortBy=publishedAt&apiKey=765b180b355145218e0a6f22b8160a1a`;

        const fetchData = async () => {
            try {
                setLoad(1);
                const response = await fetch(url);
                const json = await response.json();
                setLoad(0);
                setAdvice(json.articles);
                setResult(json.totalResults);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    // Navbaar




    //  const handleChange = (event, newValue: number) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        window.scrollTo({ top: 0, behavior: "smooth" })

    };

    //Afterthat Menu Change as like home to entertainment its again API fetch

    useEffect(() => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1&category=${name}`;
        // const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-01-22&sortBy=publishedAt&apiKey=765b180b355145218e0a6f22b8160a1a`;

        const fetchData = async () => {
            try {
                setLoad(1);
                setProgress(30);
                const response = await fetch(url);
                setProgress(50);
                const json = await response.json();
                setProgress(80);
                setLoad(0);
                setAdvice(json.articles);
                setResult(json.totalResults);
                setProgress(100);

            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();


    }, [name]);

    //Display Data

    return (

        <>
            {/* Top Loading Baar */}

            <LoadingBar
                color='red'
                height={3}
                progress={progress}
            />

            {/* End Top Loading Baar */}

            {/* Navbaar */}


            {/* <Box className='navbaar' sx={{ maxWidth: { xs: 360 }, bgcolor: '#f6f4e5' }}> */}
            <Box className='navbaar' sx={{ maxWidth: { xs: 360, sm: 880 }, bgcolor: 'background.paper' }}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab label="Home" onClick={() => {
                        setName("general");
                        document.title = `NewsMonkey`

                    }} />
                    <Tab label="Business" onClick={() => {
                        setName("business");
                        document.title = `Bussiness - NewsMonkey`
                    }} />
                    <Tab label="Entertainment" onClick={() => {
                        setName("entertainment");
                        document.title = `Entertainment - NewsMonkey`
                    }} />
                    <Tab label="Health" onClick={() => {
                        setName("health");
                        document.title = `Health - NewsMonkey`
                    }} />
                    <Tab label="Science" onClick={() => {
                        setName("science");
                        document.title = `Science - NewsMonkey`
                    }} />
                    <Tab label="Sports" onClick={() => {
                        setName("sports");
                        document.title = `Sports - NewsMonkey`
                    }} />
                    <Tab label="Technology" onClick={() => {
                        setName("technology");
                        document.title = `Technology - NewsMonkey`
                    }} />

                </Tabs>
            </Box>

            {/* Navbaar */}


            {/* Another You can Try Loading Baar */}

            {/* {load ? <Loading /> : console.log("stop")} */}


            <div className='card'>

                {

                    advice.map(function (news) {
                        return (
                            <div key={news.url}>

                                <Badge.Ribbon text={news.source.name} color="red" className='badges'>
                                    <Card title="Pushes open the window" size="default">
                                    </Card>
                                </Badge.Ribbon>
                                <Card sx={{ maxWidth: 345 }} className='card-card'>
                                    <CardActionArea >
                                        <CardMedia

                                            component="img"
                                            height="140"
                                            // image={!news.urlToImage ? "https://gagadget.com/media/cache/da/e6/dae6332bbef6c73677c71412a30144da.jpg" : news.urlToImage}
                                            image={!news.urlToImage ? "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?size=626&ext=jpg" : news.urlToImage}
                                            // image={news.urlToImage}
                                            alt="NewsPhoto"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {news.title ? news.title : " "}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {news.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className="card-footer">
                                        <p className='Date'><strong>By {!news.author ? "unknown" : news.author} on {new Date(news.publishedAt).toGMTString()}</strong></p>
                                        <a href={news.url} target="_blank"> <Button variant="contained" color="primary" size="small">
                                            more
                                        </Button></a>
                                    </CardActions>
                                </Card>

                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

