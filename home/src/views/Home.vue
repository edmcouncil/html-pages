<template>
    <div class="container">
        <main>
            <article>

<!-- 
                <h1>
                    <span> webinar: Knowledge Graph in Action</span>
                </h1>
<a href="https://register.gotowebinar.com/register/3618900380478224"><img style='width: 70%; object-fit: contain;  display: block;margin-left: auto;margin-right: auto;' src="../assets/img/OKGWebinar.png" alt="REGISTER" /></a><br>
-->
                <h1>
                    <span>EDMC OPEN KNOWLEDGE GRAPH SPECIFICATIONS</span>
                </h1>

<h4>OKG Community spaces</h4>
<img style='width: 30%; object-fit: contain;  display: block;margin-left: auto;margin-right: auto;' src="../assets/img/Open Knowledge Graph logo.png" alt="Open FIBO"  align="right"/>
<p>
<ul>
  <li>the <a href="https://github.com/edmcouncil/" v-on:click="outboundLinkClick('https://github.com/edmcouncil/fibo')">EDMC GitHub space</a> is the main EDMC development space and the space where all the official dev materials are located, and </li>
  <li>the <a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-interest-community" v-on:click="outboundLinkClick('https://edmconnect.edmcouncil.org/fibointerestgroup/home')">EDMConnect platform</a> is an official discussion forum for the OKG Community.</li>
</ul>

</p>


<h4>Quick access</h4> 

<h5>FIBO and AUTO specifications</h5>
<ul>
    <li><a href="https://spec.edmcouncil.org/fibo/">FIBO Home</a></li>   
    <li><a href="https://spec.edmcouncil.org/auto/">AUTO Home</a></li>
</ul>


<h5>OKG Shared Lab</h5>

<p class="text">EDMC recognizes the urgent need to bring this new architecture and approach to its members and beyond. In consultations with various members, analysts, and software vendors, we have launched the Open Knowledge Graph Shared Lab (OKGSL):</p>

<ul>
    <li><a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-interest-community">OKG Interest Community Page</a></li>   
    <li><a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-shared-lab">OKG Shared Lab Page</a></li>
</ul>


<h5>OKG Training</h5>
<p class="text">EDMC offers courses in Knowledge Graph and FIBO, available in multiple forms:</p>

<ul>
    <li><a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-training/okg-course-description">OKG Training Palette</a></li>
    <li><a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-training/okg-training-events">OKG Training Events</a></li>
    <li><a href="https://edmconnect.edmcouncil.org/okginterestcommunity/okg-training/regional-advocates">Contact regional advocates</a></li>        
</ul>











                
                
                <div style="clear:both;"></div>
            </article>
        </main>
    </div>
</template>

<script>
    import helpers from '../store/helpers.js';
    import {
        outboundClick, outboundLinkClick
    }
    from '../helpers/ga';

    export default {
        extends: helpers,
        name: 'home',
        components: {},
        methods: {
            outboundClick,
            outboundLinkClick,
        },
    };
</script>

<style lang="scss" scoped>
.automotive-logo{
  border: 1px solid map-get($colors-map, 'medium-grey');
  float: left;
  width: 400px;
  padding: 20px;
  margin: 0 40px 40px 0;
}
</style>