import React from 'react'
import {Container, Row, Col} from 'react-grid-system'
import Tarjeta from './components/Tarjeta'
import {Header} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Skeleton , { SkeletonTheme } from "react-loading-skeleton"
import Tabla from './components/Tabla'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            paises:[],
            pagina: 1,
            cantidadPagina: 8,
            totalRegistros: 0,
            mayor:true,
            confirmados: 0,
            recuperados: 0,
            muertes: 0,
            activos: 0,
            loading: true,
            options : {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Totales Mundiales'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },  
                title: {
                    text: ''
                },
                series: [
                    {
                        data: []
                    }
                ]
            },
            options2: {
                chart: {
                    type: 'column'
                },
                
                title: {
                    text: 'Casos de Coronavirus por paises'
                },
                xAxis: {
                    categories: [],
                    crosshair: true
                },
                series: []
            }
        }
    }

    componentDidMount(){
        this.getData()
    }
    
    getData = async () => {
        let url = "https://covid19.mathdro.id/api"
        let url2 = `https://regnierneira.com/apicorona/?mayor=${this.state.mayor}&pagina=${this.state.pagina}&cantidad=${this.state.cantidadPagina}`
        try{
            let data = await fetch(url)
            let json = await data.json()
            let data2 = await fetch(url2)
            let json2 = await data2.json()
            let options = this.state.options
            options.series[0].data= [json.recovered.value,json.deaths.value, json.confirmed.value]
            let nombres=[
                {
                    name:"Recuperados",
                    y: json.recovered.value,
                    color: '#b5cc18'    
                },
                {
                    name:"Muertes",
                    y: json.deaths.value,
                    color: '#db2828'
                },
                {
                    name:"Activos",
                    y: json.confirmed.value - (json.recovered.value + json.deaths.value),
                    color: '#21ba45'
                },
            ]
            let arr = [];
            options.series[0].data=nombres
            let options2 = this.state.options2
            let recovered = []
            let deaths = []
            let confirmed = []
            let total = []
            json2.data.map(ele => {
                options2.xAxis.categories.push(ele.pais)
                recovered.push(ele.recovered)
                deaths.push(ele.deaths)
                confirmed.push(ele.confirmed)
                total.push(ele.recovered+ele.deaths+ele.confirmed)
            })
            options2.series = [
                {
                    name: "Recuperados",
                    data: recovered,
                    color: '#b5cc18'
                }, 
                {
                    name: "Muertes",
                    data: deaths,
                    color: '#db2828'
                }, 
                {
                    name: "Activos",
                    data: confirmed,
                    color: '#21ba45'
                },
                {
                    name: 'Total',
                    data: total,
                    color: '#6435c9'
                }
            ]
            await this.setState({
                confirmados: json.confirmed.value,
                recuperados: json.recovered.value,
                muertes: json.deaths.value,
                activos: json.confirmed.value - (json.recovered.value + json.deaths.value),
                options,
                loading: false,
                paises: json2.data,
                totalRegistros: json2.total,
                options2
            })
        }catch(e){
            console.log(e)
        }
    }

    paginar = async (e, d) => {
        await this.setState({pagina: d.activePage, paises: []})
        this.getTabla()
    }

    getTabla = async () => {
        let url = `https://regnierneira.com/apicorona/?mayor=${this.state.mayor}&pagina=${this.state.pagina}&cantidad=${this.state.cantidadPagina}`
        try{
            let data = await fetch(url)
            let json = await data.json()
            let options2 = this.state.options2
            let recovered = []
            let deaths = []
            let confirmed = []
            let total = []
            options2.xAxis.categories=[]
            json.data.map(ele => {
                options2.xAxis.categories.push(ele.pais)
                recovered.push(ele.recovered)
                deaths.push(ele.deaths)
                confirmed.push(ele.confirmed)
                total.push(ele.recovered+ele.deaths+ele.confirmed)
            })

            options2.series = [
                {
                    name: "Recuperados",
                    data: recovered,
                    color: '#b5cc18'
                }, 
                {
                    name: "Muertes",
                    data: deaths,
                    color: '#db2828'
                }, 
                {
                    name: "Activos",
                    data: confirmed,
                    color: '#21ba45'
                },
                {
                    name: 'Total',
                    data: total,
                    color: '#6435c9'
                }
            ]
            await this.setState({paises: json.data, totalRegistros: json.total, options2})
        }catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col style={{marginTop: 30, marginBottom: 50}}>
                        {
                            !this.state.loading?
                            <Header as = 'h1' style={{color: '#333333'}} textAlign= 'center'>Estadísticas Coronavirus</Header> : 
                            <div style={{textAlign: 'center'}}>
                                <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                                    <Skeleton height={40} width={400}/>
                                </SkeletonTheme>
                            </div> 
                            
                        }
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Tarjeta
                            texto="Activos"
                            cantidad = {this.state.activos}
                            loading = {this.state.loading}
                            fondo = '#21ba45'
                            porcentaje = {(100*this.state.activos)/this.state.confirmados}
                        />
                    </Col>
                    <Col md={3}>
                        <Tarjeta
                            texto="Recuperados"
                            cantidad = {this.state.recuperados}
                            loading = {this.state.loading}
                            fondo = '#b5cc18'
                            porcentaje = {(100*this.state.recuperados)/this.state.confirmados}
                        />
                    </Col>
                    <Col md={3}>
                        <Tarjeta
                            texto="Muertos"
                            cantidad = {this.state.muertes}
                            loading = {this.state.loading}
                            fondo = '#db2828'
                            porcentaje = {(100*this.state.muertes)/this.state.confirmados}
                        />
                    </Col>
                    <Col md={3}>
                        <Tarjeta
                            texto="Total"
                            cantidad = {this.state.confirmados}
                            loading = {this.state.loading}
                            fondo = '#6435c9'
                            porcentaje = {100}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop: 60}}>
                    <Col md={6} style={{textAlign: 'center'}}>
                        <div style={{ borderRadius: 10, marginRight: 4, marginLeft: 4}}>
                           {
                               !this.state.loading?
                               <HighchartsReact highcharts={Highcharts} options={this.state.options} /> : 
                               <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                                   <div style={{height:30}}></div>
                                    <Skeleton circle={true} height={300} width={300} />
                                    <div style={{height:30}}></div>
                                    <Skeleton/> <Skeleton/>
                                </SkeletonTheme>
                           } 
                        </div>
                    </Col>
                    <Col md={6}>
                        <Tabla
                            data = {this.state.paises}
                            pagina = {this.state.pagina}
                            paginar = {this.paginar}
                            total = {this.state.totalRegistros / this.state.cantidadPagina}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop: 60, marginBottom: 30}}>
                    <Col>
                        {
                            !this.state.loading?
                            <HighchartsReact updateArgs={[true]} highcharts={Highcharts} options={this.state.options2} /> : 
                            <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                                <Skeleton height={400} />
                            </SkeletonTheme>
                        }
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}