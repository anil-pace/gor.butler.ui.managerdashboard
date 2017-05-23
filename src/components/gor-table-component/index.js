import React  from 'react';


class GorTable extends React.Component{
		
	render(){
		
		return (
		<div className="container-fluid" >
				  <div className="table-row header">
				    <div className="wrapper attributes">
				        <div className="column  head-title">CODE</div>
				          <div className="column  head-title">Title</div>
				          <div className="column  head-title">Comment</div>
				          <div className="column  head-title">Module</div>
				          <div className="column  head-title">Reporter</div>
				    </div>
				
				 
				  </div>

				  <div className="table-row">
				    
				    <div className="wrapper attributes">
				        <div className="column row-value">1</div>
				          <div className="column row-value">App crashes when dragged by title bar</div>
				          <div className="column row-value">Eddie, can you please take a look. We want this fixed pretty soon.</div>
				          <div className="column row-value">Main App</div>
				          <div className="column row-value">Ravan</div>
				    </div>
				  
				  </div>
				</div>
		);
	}
}

export default GorTable ;






