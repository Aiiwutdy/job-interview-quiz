<template>
    <div class="container-fluid py-5 px-5 bg-light">
        <h5 class="fs-5 fw-bold">ขนาด</h5>
        <div class="row mt-2 g-2 g-md-3 g-lg-4">
            <div class="col-md-4 cursor" v-for="ds in data.dataSize" :key="ds.id">
                <div class="py-3 px-4 rounded-4 text-center shadow change-size"
                    v-bind:class="['change-size', ds.id === selectedSize ? 'selected' : '']"
                    @click="onChangeSize(ds.id)">
                    <img :src="ds.image" :alt="ds.name" class="ws-24">
                    <span class="ps-2">{{ ds.label }}</span>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-5">
            <h5 class="fs-5 fw-bold">หมวดหมู่</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
            </svg>
        </div>
        <div class="row mt-2 g-2 g-md-3 g-lg-4 ">
            <div class="col-md-4 cursor" v-for="dc in data.dataCategories" :key="dc.id">
                <div class="py-3 px-4 w-100 rounded-4 text-center shadow change-category"
                    v-bind:class="['change-category', selectedCategory.includes(dc.id) ? 'selected' : '']"
                    @click="onChangeCategory(dc.id)">
                    <div v-if="selectedCategory.includes(dc.id)" class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" :id="dc.id" :value="dc.value" checked>
                        <label class="form-check-label" :for="dc.id">{{ dc.label }}</label>
                    </div>
                    <div v-else>{{ dc.label }}</div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-5">
            <h5 class="fs-5 fw-bold">สไตล์ภาพ</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
            </svg>
        </div>
        <div class="row mt-2">
            <div class="col-md-4 mt-2 cursor"
                v-for="(di, index) in (showAllImages ? data.dataImage : data.dataImage.slice(0, 9))" :key="di.id">
                <div class="d-flex flex-column rounded text-center shadow change-img p-0"
                    :class="['change-img', selectedImage.includes(di.id) ? 'selected-img' : '']"
                    @click="onChangeImage(di.id)">
                    <div class="position-relative p-0">
                        <img :src="di.image" class="img-dt-img" :alt="di.value">
                        <div v-if="selectedImage.includes(di.id)"
                            class="form-check form-check-inline position-absolute top-50 start-50 translate-middle">
                            <input class="form-check-input" type="checkbox" :id="di.id" :value="di.value" checked>
                        </div>
                        <div
                            class="position-absolute d-flex align-items-center justify-content-center bottom-0 start-0 mb-2 rounded w-100">
                            <span class="width-img p-2" :class="{
                                'text-white': selectedImage.includes(di.id),
                                'text-black': !selectedImage.includes(di.id),
                                'bg-active': selectedImage.includes(di.id),
                                'bg-inactive': !selectedImage.includes(di.id)
                            }">{{ di.label }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="!showAllImages" class="text-center mt-3">
            <div @click="loadMoreImages" class="load-img">โหลดเพิ่ม</div>
        </div>
        <div v-else class="text-center mt-5">
            <p>สไตล์ภาพทั้งหมด</p>
        </div>
    </div>
</template>

<script>
import data from '/data.js'

export default {
    data() {
        return {
            data,
            selectedSize: null,
            selectedCategory: [],
            selectedImage: [],
            showAllImages: false
        }
    },

    methods: {
        onChangeSize(event) {
            this.selectedSize = event
        },
        onChangeCategory(event) {
            if (!this.selectedCategory.includes(event)) {
                this.selectedCategory.push(event)
            } else {
                this.selectedCategory = this.selectedCategory.filter(id => id !== event)
            }
        },
        onChangeImage(event) {
            if (!this.selectedImage.includes(event)) {
                this.selectedImage.push(event)
            } else {
                this.selectedImage = this.selectedImage.filter(id => id !== event)
            }
        },
        loadMoreImages() {
            this.showAllImages = true
        }
    }
}
</script>

<style>
body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
}

.cursor {
    cursor: pointer;
}

/* data-Size*/
.ws-24 {
    width: 24px;
}

/* data-Categories*/
.change-size:active {
    border: #64a0fa 2px solid;
    background-color: #a0c6ff;
}

.selected {
    background-color: #a0c6ff;
    border: 2px solid #64a0fa;
    color: #007bff;
}

.change-category:active {
    border: #64a0fa 2px solid;
    background-color: #a0c6ff;
}


.form-check-input[type=checkbox] {
    border-radius: 1.25em;
}

/* data-Images*/
.img-dt-img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 24px;
    max-width: 100%;
}

.image-wrapper {
    position: relative;
}

.change-img:active {
    border: #64a0fa 2px solid;
    border-radius: 24px !important;
    background-color: #a0c6ff;
}

.selected-img {
    border-radius: 24px !important;
    background-color: #a0c6ff;
    border: 2px solid #64a0fa;
    color: #fff;
}

.bg-active {
    background-color: #3081f9;
}

.bg-inactive {
    background-color: #ffffff7a;
}

.width-img {
    width: 90%;
    border-radius: 16px;
}

.load-img {
    cursor: pointer;
    font-size: 16px;
    border: none;
    border-radius: 16px;
    color: #d209d2;
    transition: color 0.3s ease;
}

.load-img:hover {
    color: #900790;
}
</style>