import React from 'react'
import { Col, Row } from 'react-grid-system'
import CountUp from 'react-countup'
import './styles.css'
import Skeleton , { SkeletonTheme } from "react-loading-skeleton"
import {Icon} from 'semantic-ui-react'

export default class Tarjeta extends React.Component{
    render(){
        if(!this.props.loading){
            return(
                <Row className='tarjeta' style={{backgroundColor: this.props.fondo, minHeight: 120  }}>
                    <Col xs={12} style={{fontSize: 20, paddingTop: 10, paddingBottom: 10}}>
                        {this.props.texto}
                    </Col> 
                    <Col xs={7}  style={{textAlign: 'right', fontSize: 26, paddingTop: 20, paddingBottom: 10}}>
                        <CountUp
                            end = {this.props.porcentaje}
                            duration = {2}
                            decimals={1}
                            decimal=","
                        />
                        <Icon disabled size={'small'} name='percent' style={{marginLeft: 6}}/>
                    </Col>
                    <Col xs={5} style={{textAlign: 'right', fontSize: 16, paddingTop: 20, paddingBottom: 10}}>
                        <div><Icon disabled size={'large'} name='users' style={{marginRight: 6}}/></div>
                        <CountUp
                            end = {this.props.cantidad}
                            duration = {2}
                        />
                    </Col> 
                </Row>
            )
        }else{
            return(
                <Row className='tarjeta' style={{backgroundColor: this.props.fondo}}>
                    <Col xs={6} style={{fontSize: 20, paddingTop: 10, paddingBottom: 10}}>
                        <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                            <Skeleton/>
                        </SkeletonTheme>
                    </Col> 
                    <Col xs={6}></Col>
                    <Col xs={6}>
                    <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                            <Skeleton count={2}/>
                        </SkeletonTheme>
                    </Col>
                    <Col xs={6} style={{fontSize: 20, paddingTop: 10, paddingBottom: 10}}>
                        <SkeletonTheme color={this.props.fondo} highlightColor="#cecece" duration={7}>
                            <Skeleton/>
                        </SkeletonTheme>
                    </Col> 
                </Row>
            )
        }
        
    }
}