<script lang="tsx" name="AppUser">
import { useRoute } from 'vue-router';



const AppBreadcrumb = defineComponent({
    props: {
        user: {

        }
    },
    setup(props) {
        const route=useRoute()
        return () => (
            <div class={'breadcrumb-box'}></div>

        )
    }
})
export default AppBreadcrumb

</script>

<style lang="scss" scoped>

</style>