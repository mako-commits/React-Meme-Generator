import React,{Component} from 'react'

class MemeGenerator extends Component{
    constructor(){
      super()
      this.state={
        topText:'',
        bottomText:'',
        randomImg:'https://i.imgflip.com/1ur9b0.jpg',
        allMemeImgs:[]
      }
      this.handleChange=this.handleChange.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
      fetch('https://api.imgflip.com/get_memes')
      .then(response=> response.json())
      .then(response => {
          const{memes} = response.data
          console.log(memes[0])
          this.setState({allMemeImgs: memes})
      })
    }

    handleChange(event){
      const{name,value}=event.target
      this.setState({ [name]: value})
    }
    handleSubmit(event){
      event.preventDefault()
      const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
      const randMemeImg = this.state.allMemeImgs[randNum].url
      this.setState({randomImg:randMemeImg})
    }

render(){
  return(
    <div>
      <form className='meme-form' onSubmit={this.handleSubmit}>
        <input
        name='topText'
        type='text'
        value={this.state.topText}
        placeholder='Top Text'
          onChange={this.handleChange}/>
          <input
          name='bottomText'
          type='text'
          value={this.state.bottomText}
          placeholder='Bottom  Text'
            onChange={this.handleChange}/>
        <button>Gen</button>
      </form>
      <div className='meme'>
          <img src={this.state.randomImg} alt=''/>
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>


      </div>
    </div>

  )
}


}


export default MemeGenerator
