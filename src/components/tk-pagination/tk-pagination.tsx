export default defineComponent({
    emits: ['currentChange','sizeChange'],

    components: {
        ElPagination
    },

    props: {
        currentPage: {
            type: Number,
            default:1,
        },
        pageSize: {
            type: Number,
            default:10,
        },
        total:{
            type: Number,
            default:20,
        }
    },
    setup(props, content) {
        const {emit}:{emit:any}=content
        let paginationFrom = reactive({
            pageSizes: [10, 20, 50, 100],
            small: false,
            disabled: false,
            background: false,
            
        })
        let {currentPage,pageSize,total}=props
        const allMethods={
            handleSizeChange:(val:number)=>{
                emit('sizeChange',{pageSize:val})
                console.log('%c ..........val.........','color:#31ef0e',val)
            },
            handleCurrentChange:(val: number)=>{
                emit('currentChange',{currentPage:val})

                console.log('%c ..........val2.........','color:#31ef0e',val)

            }
        }
        return {
            paginationFrom,
            currentPage,
            pageSize,
            total,
            ...allMethods
        }
    },
    render() {
        return (
            <>
                <el-pagination
                    v-model:current-page={this.currentPage}
                    v-model:page-size={this.pageSize}
                    page-sizes={this.paginationFrom.pageSizes}
                    small={this.paginationFrom.small}
                    disabled={this.paginationFrom.disabled}
                    background={this.paginationFrom.background}
                    layout="total, sizes, prev, pager, next, jumper"
                    total={this.total}
                    onSizeChange={this.handleSizeChange}
                    onCurrentChange={this.handleCurrentChange}
                />
            </>
        )
    }
})