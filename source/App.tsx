import logo from './assets/logo.svg';
import styles from './App.module.scss';
import { useEffect,useState, useRef } from 'react';
import React, { Component } from "react";
import ReactDOM from "react-dom";
//import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import {Link } from "react-router-dom";
import $ from 'jquery';
 import axios from "axios";

const Promise = require("bluebird");
const getJson = require("axios-get-json-response");
const cheerio = require("cheerio");
const server = "";

function App() {
 var [toggleAddurl, setAddUrl] =useState(false);
 var [searchVar, setSearchVar] =useState('');
 var [retrievedpages, setretrievedpages] =useState([]);

const handleSubmit = (event) => {
        event.preventDefault();
    const response = axios.get(server + 'searchengine.php?action=pagesjson&search=' + searchVar)
  .then(function (response) {
    console.log(response.data);
 setretrievedpages(JSON.parse(JSON.stringify(response.data)));
  })
  .catch(function (error) {
    console.log(error);
  })
  };
  
var [newURlTitle, setnewurlTitle] =useState('');
var [newURlDesc, setnewurlDesc] =useState('');
var [newURlLink, setnewurlLink] =useState('');

function handleChangeSearch(evt) {
setSearchVar(evt.target.value)
};

function handleChangeTitle(evt) {
setnewurlTitle(evt.target.value)
};
function handleChangeDesc(evt) {
setnewurlDesc(evt.target.value)
};
function handleChangeURL(evt) {
setnewurlLink(evt.target.value)
};
const handleSubmitNewURL = (event) => {
        event.preventDefault();

    const response = axios.get(server + 'searchengine.php?action=addpage&url=' + newURlLink +"&title=" +newURlTitle+ "&desc="+newURlDesc)
  .then(function (response) {
    console.log(response.data);
  setAddUrl(false);
  })
  .catch(function (error) {
    console.log(error);
  })
  };

    return (
      
            <header className={styles['App-header']}>
<h6>Search engine&nbsp;-&nbsp;<a style={{textDecoration:'none', color:'lightblue', fontSize:'12px', marginTop:'-25px'}} onClick={() => setAddUrl(!toggleAddurl)}>Submit url</a></h6>

   {!toggleAddurl && (
<form onSubmit={handleSubmit}>
<input onChange={handleChangeSearch} style={{width:'199px'}} placeholder="Search for" type="text"></input>&nbsp;
<input style={{width:'75px', border:'0px', backgroundColor:'lightblue', height:'19px'}} type="submit" value="search"/>
</form>
   )}

   {!toggleAddurl && (
<div id='searchpage' style={{ marginTop: '15px', height: '590px', overflow: 'auto', width: '290px', border:'0px solid black', borderRadius:'3px' }} > 
{retrievedpages.length >0 && ( <p style={{fontSize:'12px', marginTop:'5px', marginLeft:'10px'}}>Found: {retrievedpages.length} results</p> )}
        {retrievedpages.slice(0, 250).map((item, index) => (
            <div style={{fontSize:'12px', marginTop:'5px'}}>
            <b style={{display:'block', width: '290px', backgroundColor:'lightgray', color:'black'}}>{item.title.substring(0,50)}</b>
            <p style={{marginTop:'2px', color:'white'}}>{item.desc.substring(0,300)}</p>
            <a style={{marginTop:'0px', color:'lightblue', textDecoration:'none'}} href={item.url}>{item.url}</a>
            </div>
))}   <br />
</div>
   )}
    {toggleAddurl && (
    <div>
 <form onSubmit={handleSubmitNewURL}>
<input onChange={handleChangeTitle} style={{width:'120px'}} type="text" placeholder="Title"></input><br />
<input onChange={handleChangeDesc} style={{width:'120px'}} type="text"  placeholder="Description"></input><br />
<input onChange={handleChangeURL} style={{width:'120px'}} type="text"  placeholder="URL"></input><br />
<input  type="submit"  style={{width:'130px', backgroundColor:'lightblue', height:'25px'}} value="Add url"></input>
</form>  
</div> )}       

            </header>

    );
}

export default App;
