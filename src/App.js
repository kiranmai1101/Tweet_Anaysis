import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Form, InputGroup, FormControl, FormGroup, Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import { useState, useRef, useLayoutEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from "axios";
import Pagination from './components/pagination';
import OverallAnalysis from './components/OverallAnalysis';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
function App() {
  const ref = useRef(null)
  const [block, setBlock] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [flag, setFlag] = useState(false)
  const [navlink, setNavlink] = useState(true)
  const [poi, setPoi] = useState("")
  const [country, setCountry] = useState("")
  const [query_data, setQuery_data] = useState([])
  const [active, setActive] = useState(1)
  const [page, setPages] = useState()
  const [pagination, setPagination] = useState(false)
  const [tKey, settKey] = useState("POI")
  const [poi_flag, setpoi_flag] = useState(true)
  const [news,setnews]=useState([])
  const [news_data,setnews_data]=useState([])
  const [colors, setColors] = useState([
    "#99ff99",
    "#ff9999",
    "#66a3ff",
    "#800080",
    "#FFFF00",
    "#00FF00",
    "#FF00FF",
    "#FFC0CB",
    "#FFA500",
    "#800000",
    "#008000",
    "#7FFD4",
    "#808000",
    "#808080",
    "#FFFFFF",
    "#A52A2A"
  ])

 const [p_n_sentiment,setp_n_sentiment] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [p_n_political,setp_n_political] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [p_n_v_info,setp_n_v_info] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [v_hecitancy,setv_hecitancy] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })
  const [query_POI_vs_tweet_count, setQuery_POI_vs_tweet_count] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })
  const [querysumsentiment, setquerysumsentiment] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })
  const [query_country_vs_tweet_count, setQuery_country_vs_tweet_count] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })
  const [Overall_POI_vs_tweet_count, setOverall_POI_vs_tweet_count] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [Overall_country_vs_tweet_count, setOverall_country_vs_tweet_count] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [Overall_language_vs_tweet_count, setOverall_language_vs_tweet_count] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })
  const [querytweetsentiment, setQuerytweetsentiment] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const [state, setState] = useState({
    labels: [], datasets: [
      {
        label: '',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
      }
    ]
  })

  const setResonseData = (data, i) => {
    let keys = Object.keys(data)
    let vals = Object.values(data)
    let lab = []
    let dat = []
    let bcolor = []

    for (let i = 0; i < keys.length; i++) {
      if (vals[i] > 0) {
        lab.push(keys[i]);
        dat.push(vals[i])
      }
      bcolor.push(colors[i])
    }
    if (i == 1) {
      setQuery_POI_vs_tweet_count({
        labels: lab, datasets: [
          {
            label: 'Query_POI_vs_tweet_count',
            backgroundColor: bcolor,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: dat
          }
        ]
      })

    }
    else if (i == 2) {
      setQuery_country_vs_tweet_count({
        labels: lab, datasets: [
          {
            label: 'Query_country_vs_tweet_count',
            backgroundColor: bcolor,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: dat
          }
        ]
      })
    }
    else if (i == 4) {
      let l = ['postive_tweet_percentage', 'neutral_tweet_percentage', 'negative_tweet_percentage']
      let d = []
      d.push(vals[0])
      d.push(vals[2])
      d.push(vals[3])
      console.log("dileep")
      setQuerytweetsentiment({
        labels: l, datasets: [
          {
            label: 'Query_country_vs_tweet_count',
            backgroundColor: bcolor,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: d
          }
        ]
      })
      let l1 = ["sum_of_positive_sentiment", "sum_of_negative_sentiment"]
      let d1 = []
      d1.push(vals[1])
      d1.push((vals[4])*-1)
      console.log(vals)
      setquerysumsentiment({
        labels: l1, datasets: [
          {
            label: 'Query_country_vs_tweet_count',
            backgroundColor: bcolor,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: d1
          }
        ]
      })

    }
    handlenotsetBlock()
  }
  const [baseURL, setBaseUrl] = useState("https://18.217.156.180:8000/search/")
  const getSerachResults = async() => {
    console.log(country)
    try{

    
    await axios
      .post(baseURL, JSON.stringify({
        "poi_name": poi,
        "country": country,
        "search_query": keyword,
        "start": 0,
        "poi_flag": true
      }))
      .then((response) => {
        console.log(response)
        let num = response.data.response.numFound
        let size = Math.floor(num / 10)
        if (num % 10 == 0) {
          setPages(size)
        }
        else {
          setPages(size + 1)
        }
        setQuery_data(response.data.response.docs);
        let response_keys = Object.keys(response.data)
        for (let i = 0; i < response_keys.length; i++) {
          if (response_keys[i] != 'response') {
            setResonseData(response.data[response_keys[i]], i)
          }

        }

      })

     axios.get(`https://gnews.io/api/v4/search?q=${keyword}&token=f853c18f30683375a6c87b483f74e432`).then((response)=>{
      console.log(response)
      let resp=response.data.articles
      setnews(resp)
      let data=[]
      for(let i=0; i<10;i++){
        data.push(resp[i])
      }
      setnews_data(data)
    })
  }
  catch{
    handlenotsetBlock()
  }
  }
  const getGeneralResults = () => {
    console.log(poi_flag)
    axios
      .post(baseURL, JSON.stringify({
        "poi_name": poi,
        "country": country,
        "search_query": keyword,
        "start": 0,
        "poi_flag": false
      }))
      .then((response) => {
        console.log(response)
        let num = response.data.response.numFound
        let size = Math.floor(num / 10)
        if (num % 10 == 0) {
          setPages(size)
        }
        else {
          setPages(size + 1)
        }
        setQuery_data(response.data.response.docs);
        let response_keys = Object.keys(response.data)
        for (let i = 0; i < response_keys.length; i++) {
          if (response_keys[i] != 'response') {
            setResonseData(response.data[response_keys[i]], i)
          }

        }

      })
  }
  const handlePageChange = (page, flag) => {
    handlesetBlock()
    let p = 0
    if (flag == 0) {
      p = page - 1;
    }
    else if (flag == 1) {
      p = page;
    }
    else if (flag == 2) {
      p = page - 2;
    }
    axios.post(baseURL, JSON.stringify({
      "poi_name": poi,
      "country": country,
      "search_query": keyword,
      "start": (p) * 10,
      "poi_flag": poi_flag
    }))
      .then((response) => {
        setQuery_data(response.data.response.docs);
        handlenotsetBlock()
        setResonseData(response.data.query_sentiment_analysis, 4)
      })
  }

  // const handleBlock=()=>{
  //   setBlock(true)
  // }
  const handleSearch = () => {
    console.log(ref.current)
    if (flag) {
      // ref.current.changePage()
      setPagination(true)
    }
    handlesetBlock()
    setFlag(true);
    getSerachResults();

  }
  const handlePagination = () => {
    setPagination(false)
  }
  const countries_dropdown = ["USA", "INDIA", "MEXICO"]
  const pois_dropdown = ["narendramodi", "drharshvardhan",
    "MoHFW_INDIA",
    "ysjagan",
    "smritiirani",
    "HHSGov",
    "JoeBiden",
    "KamalaHarris",
    "XavierBecerra",
    "GavinNewsom",
    "lopezobrador_",
    "SSaludCdMx",
    "SSalud_mx",
    "SecSaludBAQ",
    "MartinOrozcoAgs"]

  const getOverviewData = () => {
     axios
      .post("https://18.217.156.180:8000/overview/", JSON.stringify({
        "poi_name": "*",
        "country": "",
        "search_query": "",
        "start": 0
      }))
      .then((response) => {
        console.log(response)
        if (response.data.Overall_POI_vs_tweet_count) {
          let bcolor = []
          for (let i = 0; i < Object.keys(response.data.Overall_POI_vs_tweet_count).length; i++) {
            bcolor.push(colors[i])
          }
          console.log(bcolor)
          setOverall_POI_vs_tweet_count({
            labels: Object.keys(response.data.Overall_POI_vs_tweet_count), datasets: [
              {
                label: 'Overall_POI_vs_tweet_count',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(response.data.Overall_POI_vs_tweet_count)
              }
            ]
          })
        }

        if (response.data.Overall_country_vs_tweet_count) {
          let bcolor = []
          for (let i = 0; i < Object.keys(response.data.Overall_country_vs_tweet_count).length; i++) {
            bcolor.push(colors[i])
          }
          console.log(bcolor)
          setOverall_country_vs_tweet_count({
            labels: Object.keys(response.data.Overall_country_vs_tweet_count), datasets: [
              {
                label: 'Overall_POI_vs_tweet_count',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(response.data.Overall_country_vs_tweet_count)
              }
            ]
          })
        }
        if (response.data.Overall_language_vs_tweet_count) {
          let bcolor = []
          for (let i = 0; i < Object.keys(response.data.Overall_language_vs_tweet_count).length; i++) {
            bcolor.push(colors[i])
          }
          console.log(bcolor)
          setOverall_language_vs_tweet_count({
            labels: Object.keys(response.data.Overall_language_vs_tweet_count), datasets: [
              {
                label: 'Overall_country_vs_tweet_count',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(response.data.Overall_language_vs_tweet_count)
              }
            ]
          })
        }


        if (response.data.Overall_insights) {

          let keys=Object.keys(response.data.Overall_insights)

          let values=Object.values(response.data.Overall_insights)

          let bcolor = []
          for (let i = 0; i < 2; i++) {
            bcolor.push(colors[i])
          }

          let p_keysenti=[]
          p_keysenti.push(keys[0])
          p_keysenti.push(keys[1])

          let p_valsenti=[]
          p_valsenti.push(values[0])
          p_valsenti.push(values[1])

          let p_keysenti1=[]
          p_keysenti1.push(keys[2])
          p_keysenti1.push(keys[3])

          let p_valsenti1=[]
          p_valsenti1.push(values[2])
          p_valsenti1.push(values[3])

          let p_keysenti2=[]
          p_keysenti2.push(keys[4])
          p_keysenti2.push(keys[5])

          let p_valsenti2=[]
          p_valsenti2.push(values[4])
          p_valsenti2.push(values[5])

          let p_keysenti3=[]
          p_keysenti3.push(keys[5])
          p_keysenti3.push(keys[6])

          let p_valsenti3=[]
          p_valsenti3.push(values[5])
          p_valsenti3.push(values[6])


          setp_n_sentiment({
            labels: p_keysenti, datasets: [
              {
                label: 'overall sentiment analysis',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: p_valsenti
              }
            ]
          })

          setp_n_political({
            labels: p_keysenti1, datasets: [
              {
                label: 'overall policatal rhetoric analysis',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: p_valsenti1
              }
            ]
          })

          setp_n_v_info({
            labels: p_keysenti2, datasets: [
              {
                label: 'overall vaccine disinfo analysis',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: p_valsenti2
              }
            ]
          })

          setv_hecitancy({
            labels: p_keysenti3, datasets: [
              {
                label: 'overall Persuation against vaccine disinfo analysis',
                backgroundColor: bcolor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: p_valsenti3
              }
            ]
          })



          // let bcolor = []
          // for (let i = 0; i < Object.keys(response.data.Overall_language_vs_tweet_count).length; i++) {
          //   bcolor.push(colors[i])
          // }
          // console.log(bcolor)
          // setOverall_language_vs_tweet_count({
          //   labels: Object.keys(response.data.Overall_language_vs_tweet_count), datasets: [
          //     {
          //       label: 'Overall_country_vs_tweet_count',
          //       backgroundColor: bcolor,
          //       borderColor: 'rgba(0,0,0,1)',
          //       borderWidth: 2,
          //       data: Object.values(response.data.Overall_language_vs_tweet_count)
          //     }
          //   ]
          // })
        }

        handlenotsetBlock()
      })
  }
  const handleOverview = () => {
    handlesetBlock()
    setNavlink(false)
    getOverviewData()
  }
  const handlesetBlock = () => {
    setBlock(true)
  }
  const handlenotsetBlock = () => {
    setBlock(false)
  }
  return (
    <div>
      <BlockUi tag="div" blocking={block}>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Twitter</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => setNavlink(true)}>Home</Nav.Link>
                <Nav.Link onClick={handleOverview}>Overview Analytics</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>

        {navlink &&
          <div>
            <div className={flag ? 'top-screen' : 'center-screen'}>

              <FormGroup style={{ width: "90%", display: 'flex', marginLeft: '5em', marginTop: '1em' }}>
                <InputGroup style={{ width: flag ? '30%' : '80%', height: "70%" }}>
                  <FormControl
                    value={keyword}
                    placeholder="Search"
                    aria-label="keyword"
                    aria-describedby="basic-addon1"
                    onChange={(e) => { setKeyword(e.target.value) }}
                  />
                </InputGroup>
                <Button style={{ marginLeft: '10px', width: "6em", height: '2.4em' }} disabled={keyword!=""?false:true} onClick={handleSearch}>Search</Button>

                {flag && <div style={{ display: 'flex', marginLeft: '6%' }}>
                  <Form.Group style={{ display: 'flex' }}>
                    <Form.Label>POI</Form.Label>
                    <Form.Select value={poi} onChange={(e) => setPoi(e.target.value)} style={{ marginLeft: '0.5em', width: "11em", marginRight: '0.5em' }}>
                      <option value="">Choose...</option>
                      {pois_dropdown.map((poii, i) =>
                        <option key={i} value={poii}>{poii}</option>
                      )
                      }
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{ display: 'flex' }}>
                    <Form.Label>Country</Form.Label>
                    <Form.Select value={country} onChange={(e) => setCountry(e.target.value)} style={{ marginLeft: '0.5em', width: "11em", marginRight: '0.5em' }}>
                      <option value="">Choose...</option>
                      {countries_dropdown.map((countr, i) =>
                        <option key={i} value={countr}>{countr}</option>
                      )
                      }
                    </Form.Select>
                  </Form.Group>
                </div>
                }
              </FormGroup>

            </div>


            {flag && <Container>

              <Row>
                <Col xs={4} sm={4} >
                  <b>Tweets Search Results</b>
                  <hr></hr>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={tKey}
                    onSelect={(k) => {
                      settKey(k);
                      console.log(k)
                      if (k == "POI") {
                        handlesetBlock()
                        setpoi_flag(true)
                        getSerachResults()
                      }
                      else if (k == "General") {
                        handlesetBlock()
                        setpoi_flag(false);
                        getGeneralResults()
                      }
                    }}
                    className="mb-3"
                  >
                    <Tab eventKey="POI" title="POI Results">
                    </Tab>
                    <Tab eventKey="General" title="General Results">
                    </Tab>
                  </Tabs>
                  {query_data.length>0 && query_data.map((res, i) =>
                    <>
                      <p key={i}><b key={i}>{'@' + res.poi_name ? res.poi_name : "General"}</b> <br></br>
                        <p style={{ fontSize: "0.8em" }}>{res.tweet_text}</p>
                        <p style={{ fontSize: "0.8em" }}>Sentiment: {res.sentiment}</p>
                      </p>
                    </>
                  )
                  }
                  {query_data.length>0 &&
                    <Pagination pages={page} handlePageChange={handlePageChange} pagination={pagination} handlePagination={handlePagination} ref={ref}></Pagination>
                  }
                </Col>
                <Col xs={4} sm={4}>
                  <b>News Search Results</b>
                  <hr></hr>
                  { news && news_data.map((res,i)=>
                  <>
                  <p key={i}><b key={i}>{'@' + res.source.name}</b> <br></br>
                        <p style={{ fontSize: "0.8em" }}>{res.content}</p>

                      </p>
                  </>
                  )
                  }
                </Col>
                <Col xs={4} sm={4}>
                  <b> Search Results Analysis</b>
                  <hr></hr>
                  
                  {query_data.length>0 && poi_flag && 
                  <>
                  <br/>
                  <b style={{marginLeft:"5em"}}>Plot for POI tweets Count</b>
                  <Bar
                    data={query_POI_vs_tweet_count}
                  />
                  </>
                  }
                  {query_data.length>0 &&
                  <>
                  <br/>
                  <b style={{marginLeft:"5em"}}>Plot for Country wise tweet Count</b>
                    <Bar
                      data={query_country_vs_tweet_count}
                    ></Bar>
                    </>
                  }
                  {query_data.length>0 &&
                  <>
                  <br/>
                  <b style={{marginLeft:"5em"}}>Plot for tweet sentiment </b>
                    <Pie  data={querytweetsentiment}></Pie>
                
                  </>
}
                  
                  {
                    query_data.length>0 &&
                    <>
                    <br/>
                    <b style={{marginLeft:"1em"}}>Plot for sum of overall tweet sentiment</b>
                    <Bar data={querysumsentiment} />
                    </>
                  }
                
                </Col>
              </Row>
            </Container>
            }
          </div>
        }
        {!navlink && <div>
          <OverallAnalysis
            Overall_POI_vs_tweet_count={Overall_POI_vs_tweet_count}
            Overall_country_vs_tweet_count={Overall_country_vs_tweet_count}
            Overall_language_vs_tweet_count={Overall_language_vs_tweet_count}
            v_hecitancy={v_hecitancy}
            p_n_v_info={p_n_v_info}
            p_n_political={p_n_political}
            p_n_sentiment={p_n_sentiment}
          ></OverallAnalysis>
        </div>

        }
      </BlockUi>
    </div>
  );
}

export default App;
