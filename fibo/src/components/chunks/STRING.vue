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
export default {
    name: 'STRING',
    props: ['value'],
    computed: {
        fullProcessedHtml() {
            let html = this.lines.join("<br />");
            return {
                template: `<div>${html}</div>`
            };
        },
        sliceProcessedHtml() {
            let html = this.lines.slice(0, 6).join("<br />");
            return {
                template: `<div>${html}</div>`
            };
        },
        moreProcessedHtml() {
            let html = this.lines.slice(6).join("<br />");
            return {
                template: `<div>${html}</div>`
            };
        }
    },
    data() {
      const regexLang = /\[[a-z]{2}\]|@[a-z]{2}/
      var tlines = this.value.split(/(?:\r\n|\r|\n)/g);
        tlines.forEach(function(part, index){
            console.log(part);
            console.log(part.match(regexLang));
          var regexMatch = part.match(regexLang);
          if(regexMatch!=null) {
            regexMatch.forEach(function(match, indexMatch){
              var replacementLang = match.replace("[","").replace("]","");
              var rep = part.replace(match, `<lang-flag iso="${replacementLang}" />`);
              tlines[index] = rep;
              }, regexMatch);
            
          }
        }, tlines);
      return {
          lines: tlines,
          isShowMore: false,
          isMoreVisible: false,
      };
    },

    mounted() {
        if (this.lines.length > 6) { // yes 6, first line is "title"
            this.isShowMore = true;
        }
    },
};
</script>