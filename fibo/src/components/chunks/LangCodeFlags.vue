<template>
    <span v-if="isFlag" class="flag-icon" :class="flagIconClass" :title="langName + ' - ISO: ' + iso"></span>
    <span v-else v-once>@{{ iso }} </span>
</template>
<script>
import "flag-icon-css/css/flag-icon.css";
import relation from "./langToFlagRelations";
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
                (!!this.squared ? "flag-icon-squared " : "") +
                "flag-icon-" +
                this.flagIso
            );
        }
    }
};
</script>