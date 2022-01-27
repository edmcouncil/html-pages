<template>
<div v-if="!isShowMore">
    <component v-bind:is="fullProcessedHtml"></component>
</div>
<div v-else>
    <component v-bind:is="sliceProcessedHtml">
    </component>
    <a href="#" 
      v-show="!isMoreVisible" 
      @click.prevent="isMoreVisible = !isMoreVisible">
        See more...
    </a>

    <div v-show="isMoreVisible">
        <component v-bind:is="moreProcessedHtml"></component>
        <a href="#" 
          @click.prevent="isMoreVisible = !isMoreVisible">
            See less...
        </a>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import customLink from "./link";

Vue.component("customLink", customLink);

export default {
    name: "AXIOM",
    components: {
        customLink
    },
    props: ["value", "entityMaping"],
       data() {
        const regexLang = /\[[a-z]{2}\]|@[a-z]{2}/
        let html = this.value;
        let lines = html.split(/(?:\r\n|\r|\n)/g);
        if (lines.length == 1) {
            lines = html.split("<br />");
        }
        lines.forEach(function(part, index){
          var regexMatch = part.match(regexLang);
          if(regexMatch!=null) {
            regexMatch.forEach(function(match, indexMatch){
              var replacementLang = match.replace("[","").replace("]","").replace("@", "");
               var rep ;
              if(replacementLang==='sv'){ 
                 //add Swedish lang support
                rep =  part.replace(match, "<span class='flag-icon flag-icon-se'></span>");  //se
              } else {
                rep =  part.replace(match, `<lang-flag iso="${replacementLang}" />`);
              }
              lines[index] = rep;
              }, regexMatch);
            
          }
        }, lines);
        return {
            lines: lines,
            isShowMore: false,
            isMoreVisible: false
        };
    },
    computed: {
        fullProcessedHtml() {
            let html = this.processedHtml(this.lines.join("<br />"));
            return {
                template: `<div>${html}</div>`
            };
        },
        sliceProcessedHtml() {
            let html = this.processedHtml(this.lines.slice(0, 6).join("<br />"));
            return {
                template: `<div>${html}</div>`
            };
        },
        moreProcessedHtml() {
            let html = this.processedHtml(this.lines.slice(6).join("<br />"));
            return {
                template: `<div>${html}</div>`
            };
        }
    },
 

    mounted() {
        if (this.lines.length > 6) {
            // yes 6, first line is "title"
            this.isShowMore = true;
        }
    },
    methods: {
        processedHtml: function (htmlInput) {
            let htmlResult = htmlInput;
            htmlResult = htmlResult.replace("/arg1/", "<b>/arg1/</b>");
            if (this.entityMaping) {
                Object.keys(this.entityMaping).forEach(name => {
                    const value = this.entityMaping[name];
                    htmlResult = htmlResult.replace(
                        name,
                        `<customLink name="${value.label}" query="${value.iri}"></customLink>`
                    );
                });
            }
            return htmlResult;
        }
    }
};
</script>
