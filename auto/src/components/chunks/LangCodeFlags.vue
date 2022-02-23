<template>
    <span v-if="isFlag" class="fi" :class="flagIconClass" :title="langName + ' - ISO: ' + iso"></span>
    <span v-else v-once>@{{ iso }} </span>
</template>
<script>
import "flag-icons/css/flag-icons.css";
import relation from "./langFlagData.js";
export default {
    name: "LangCodeFlags",
    props: {
        iso: { type: String, required: true },
        squared: { type: Boolean, default: false }
    },
    data() {
        var isFlag = relation[this.iso.toLowerCase()] === null ? false : true;
        return {
            isFlag: isFlag,
            flagIso: relation[this.iso.toLowerCase()].flag,
            langName: relation[this.iso.toLowerCase()].name
        };
    },
    computed: {
        flagIconClass: function() {
            return (
                (!!this.squared ? "fis " : "") +
                "fi-" +
                this.flagIso
            );
        }
    }
};
</script>