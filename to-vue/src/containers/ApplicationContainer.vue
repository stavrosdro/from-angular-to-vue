<template>
  <BaseDialog @onCloseDialog="onCloseDialog">
    <div class="application">
      <h3>Job Application</h3>
      <form class="form" @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="jobTitleAndCompany">Job Title & Company</label>
          <input
            v-model="form.jobTitleAndCompany.value"
            id="jobTitleAndCompany"
            type="text"
            :disabled="form.jobTitleAndCompany.disabled"
          />
        </div>
        <div class="form-control">
          <input
            v-model="form.firstName.value"
            @input="updateValidity('firstName')"
            type="text"
            placeholder="First Name"
          />
          <div
            class="error__wrapper"
            v-if="form.firstName.invalid && form.firstName.touched"
          >
            <span
              class="error__message"
              v-if="form.firstName.errors[VALIDATORS_KEY.REQUIRED]"
            >
              This field is required
            </span>
          </div>
        </div>
        <div class="form-control">
          <input
            v-model="form.lastName.value"
            @input="updateValidity('lastName')"
            type="text"
            placeholder="Last Name"
          />
          <div
            class="error__wrapper"
            v-if="form.lastName.invalid && form.lastName.touched"
          >
            <span
              class="error__message"
              v-if="form.lastName.errors[VALIDATORS_KEY.REQUIRED]"
            >
              This field is required
            </span>
          </div>
        </div>
        <div class="form-control">
          <input
            v-model="form.email.value"
            @input="updateValidity('email')"
            type="text"
            placeholder="Email"
          />
          <div
            class="error__wrapper"
            v-if="form.email.invalid && form.email.touched"
          >
            <span
              class="error__message"
              v-if="form.email.errors[VALIDATORS_KEY.REQUIRED]"
            >
              This field is required
            </span>
            <span
              class="error__message"
              v-if="form.email.errors[VALIDATORS_KEY.EMAIL]"
            >
              Email is invalid
            </span>
          </div>
        </div>
        <div class="actions">
          <button class="button" @click="onCloseDialog" type="button">
            Close
          </button>

          <button class="button float scale-on-hover" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import BaseDialog from "@/base/BaseDialog.vue";
import router from "@/router";
import { useCoreStore } from "@/core";

enum VALIDATORS {
  REQUIRED = "REQUIRED",
  EMAIL = "EMAIL",
}

type CustomFormGroup = {
  [s: string]: CustomFormControl;
};

type CustomFormControl = {
  value: string | number;
  validators?: VALIDATORS[];
  errors: { [s in VALIDATORS]?: boolean };
  disabled?: boolean;
  touched: boolean;
  invalid: boolean;
};

enum LOCAL_STORAGE_KEY {
  PERSONAL_FIELDS_V1 = "PERSONAL_FIELDS_V1",
}

type PersonalFields = {
  firstName: string;
  lastName: string;
  email: string;
};

export default defineComponent({
  setup() {
    const store = useCoreStore();
    const form = reactive<CustomFormGroup>({
      firstName: {
        value: "",
        validators: [VALIDATORS.REQUIRED],
        errors: {},
        touched: false,
        invalid: true,
      },
      lastName: {
        value: "",
        validators: [VALIDATORS.REQUIRED],
        errors: {},
        touched: false,
        invalid: true,
      },
      email: {
        value: "",
        validators: [VALIDATORS.REQUIRED, VALIDATORS.EMAIL],
        errors: {},
        touched: false,
        invalid: true,
      },
      jobTitleAndCompany: {
        value: `${store.selectedJob?.name} @ ${store.selectedJob?.company}`,
        errors: {},
        disabled: true,
        touched: false,
        invalid: true,
      },
      jobId: {
        value: `${store.selectedJob?.id}`,
        errors: {},
        touched: false,
        invalid: false,
      },
    });

    const isFormInvalid = ref(true);

    const personalFieldsString = localStorage.getItem(
      LOCAL_STORAGE_KEY.PERSONAL_FIELDS_V1
    );
    if (personalFieldsString) {
      const { firstName, lastName, email } = JSON.parse(
        personalFieldsString
      ) as PersonalFields;
      form.firstName.value = firstName;
      form.lastName.value = lastName;
      form.email.value = email;
      validateForm(form);
    }

    const VALIDATORS_KEY = VALIDATORS;

    function markAllAsTouched(form: CustomFormGroup) {
      Object.keys(form).forEach((key) => {
        form[key].touched = true;
      });
    }

    function updateValidity(controlName: string) {
      const control = form[controlName];
      control.touched = true;
      validateFormControl(control);
    }

    function validateFormControl(control: CustomFormControl) {
      control.errors = {};
      control.invalid = false;

      if (control.disabled || !control.validators) {
        return;
      }

      control.validators.forEach((validator) => {
        if (control.invalid) {
          return;
        }
        switch (validator) {
          case VALIDATORS.REQUIRED:
            if (control.value == null || control.value == "") {
              control.errors[VALIDATORS.REQUIRED] = true;
              control.invalid = true;
              return;
            }
            if (
              typeof control.value === "string" &&
              control.value.trim() === ""
            ) {
              control.errors[VALIDATORS.REQUIRED] = true;
              control.invalid = true;
              return;
            }
            break;

          case VALIDATORS.EMAIL:
            if (typeof control.value != "string") {
              control.errors[VALIDATORS.EMAIL] = true;
              control.invalid = true;
              return;
            }

            if (
              !control.value
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
              control.errors[VALIDATORS.EMAIL] = true;
              control.invalid = true;
              return;
            }
            break;
        }
      });
    }

    function validateForm(form: CustomFormGroup) {
      isFormInvalid.value = false;
      Object.keys(form).forEach((key) => {
        const formControl = form[key];
        validateFormControl(formControl);
        if (formControl.invalid) {
          isFormInvalid.value = true;
        }
      });
    }

    function getFormValue(form: CustomFormGroup) {
      let value: { [s: string]: string | number } = {};
      Object.keys(form).forEach((key) => {
        value[key] = form[key].value;
      });
      return value;
    }

    function onCloseDialog() {
      router.back();
    }

    function onSubmit() {
      validateForm(form);
      if (isFormInvalid.value) {
        markAllAsTouched(form);
        return;
      }
      console.log(getFormValue(form));
    }

    watch(
      form,
      (f) => {
        const value = getFormValue(f);
        localStorage.setItem(
          LOCAL_STORAGE_KEY.PERSONAL_FIELDS_V1,
          JSON.stringify(value)
        );
      },
      { deep: true }
    );

    return { form, VALIDATORS_KEY, updateValidity, onCloseDialog, onSubmit };
  },
  components: { BaseDialog },
});
</script>

<style lang="scss" scoped>
.application {
  h3 {
    text-align: center;
  }
  .form {
    .form-control {
      margin-left: 8px;
      margin-right: 8px;
      margin-bottom: 24px;

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 8px 16px;
        border-radius: 8px;
        border-color: black;
        outline: none;
      }

      .error__wrapper {
        position: absolute;
        .error__message {
          margin-left: 8px;
          color: red;
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
