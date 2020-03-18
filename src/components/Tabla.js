import React, {Component} from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import Skeleton , { SkeletonTheme } from "react-loading-skeleton"
import CountUp from 'react-countup'


export default class Tabla extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
            {
                this.props.data.length!=0?
                <div>
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Países</Table.HeaderCell>
                                <Table.HeaderCell>Activos</Table.HeaderCell>
                                <Table.HeaderCell>Recuperados</Table.HeaderCell>
                                <Table.HeaderCell>Muertos</Table.HeaderCell>
                                <Table.HeaderCell>Total</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.props.data.map((ele, index) => {
                                    return(<Table.Row key={ele, index   }>
                                            <Table.Cell>{ele.pais}</Table.Cell>
                                            <Table.Cell  style={{color: '#21ba45', fontWeight: 'bold'}}>
                                                <CountUp
                                                    end = {ele.confirmed}
                                                    duration = {2}
                                                />
                                            </Table.Cell>
                                            <Table.Cell style={{color: '#b5cc18', fontWeight: 'bold'}}>
                                                <CountUp
                                                    end = {ele.recovered}
                                                    duration = {2}
                                                />
                                            </Table.Cell>
                                            <Table.Cell style={{color: '#db2828', fontWeight: 'bold'}}>
                                                <CountUp
                                                    end = {ele.deaths}
                                                    duration = {2}
                                                />
                                            </Table.Cell>
                                            <Table.Cell  style={{color: '#6435c9', fontWeight: 'bold'}}>
                                            <CountUp
                                                    end = {ele.confirmed+ele.recovered+ele.deaths}
                                                    duration = {2}
                                                />
                                                
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                    <div style={{textAlign: 'center'}}>
                        <Pagination
                            inverted
                            boundaryRange={0}
                            defaultActivePage={this.props.pagina}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={Math.trunc(this.props.total)+1}
                            onPageChange={ (e, d) => this.props.paginar(e, d)}
                        />
                    </div> 
                    
                </div>
                
                :
                <SkeletonTheme color={"#333333"} highlightColor="#cecece" duration={7}>
                    <Skeleton count={9} height={40}/>
                    <div style={{textAlign:'center'}}><Skeleton height={40} width={200}/></div>
                </SkeletonTheme>
            }
           </>
        )
    }
}