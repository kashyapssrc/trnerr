<template>
<div>
  <br />
    <section id="inner-content-wrap">   
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
          <!--Box shadow table wrap-->
            <div class="card">
            <!--Table header-->
              <div class="card-header" id="table-toolbar-top">
                <div class="table-toolbar-wrap">
                <!--Table title-->
                  <div class="table-toolbar-header">
                    <h3 class="h4 table-header"><i class="icon-window-delete"></i> Message History </h3>
                  </div><!--/.table-toolbar-header-->
                </div><!--/.table-toolbar-wrap-->
              </div><!--/.card-header-->

              <div class="card-body wbl-page">
              <!--Search-->

              <!--  The full search section  -->
                <div class="card-segment-horizontal">
                  <h3>Search</h3>
                  <div class="card-segment-horizontal-content">
                
                    <!--Search form, Row 1-->
                    <div class="quarantine-search-wrap-row">

                        <div v-if="!parentCustomerId" class="quarantine-search-to">
                            <div class="form-group">
                                <label>Customer:</label>
                                    <select name="name" class="form-control hand" v-model="customerId" required>
                                        <option class="dropdownSenderList" value="">Select a Customer</option>
                                        <option class="dropdownSenderList" :value="customer.id" v-for="customer in customers" :id="customer.id">{{customer.name}}</option>
                                    </select>
                            </div>
                        </div>

                        <div class="quarantine-search-to">
                            <div class="form-group">
                                 <label>Recipient Domain:</label>
                                    <select name="name" class="form-control hand" v-model="domainId">
                                        <option class="dropdownDomain" value="">All Domains</option>
                                        <option class="dropdownDomain" v-for="domain in domains" :id="domain.id" :value="domain.id">
                                            {{domain.name}}
                                      </option>
                                </select>
                            </div>
                        </div>

                        <div class="quarantine-search-to">
                            <div class="form-group">
                                 <label>Current Status:</label>
                                    <select name="name" class="form-control hand" v-model="searchState">
                                        <option value="">Any Status</option>
                                        <option value="bounced">Bounced</option>
                                        <option value="deferred">Deferred</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="discarded">Discarded</option>
                                        <option value="processing">Processing</option>
                                        <option value="quarantined">Quarantined</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="undeliverable">Undeliverable</option>
                                </select>
                            </div>
                          </div>
                    </div>

                    <div class="quarantine-search-wrap-row" id="quarantine-search-row1">

                        <!--From: field-->
                        <div class="quarantine-search-to">
                            <div class="form-group">
                                <label>From:</label>
                                    <vue-bootstrap-typeahead :data="senders" v-model="searchFrom" size="lg" :serializer="s => s" placeholder="Type an email address..." @hit="selectedSender = $event" ref="senderSearchAutocomplete"/>
                            </div><!--/.form-group-->
                        </div><!--/.message-search-to-->

                        <!--To: field-->
                        <div class="quarantine-search-to">
                          <div class="form-group">
                            <label>To:</label>  
                            <vue-bootstrap-typeahead :data="recipients" v-model="searchTo" size="lg" :serializer="s => s" placeholder="Type an email address..." @hit="selectedRecipient = $event" ref="recipientSearchAutocomplete"/>
                          </div><!--/.form-group-->
                        </div><!--/.message-search-to-->

                        <!--Subject-->
                        <div class="quarantine-search-subject">
                          <div class="form-group">
                             <label>Subject:</label>
                             <input type="text" id="subject" class="form-control" placeholder="Email Subject" v-model="searchSubject">
                          </div><!--/.form-group-->
                        </div><!--/.quarantine-search-subject-->


                      </div><!--/.message-search-wrap-row-->
                      <!--Search form, Row 2-->
                    
                      <div class="quarantine-search-wrap-row col-md-8">
                        
                        <!--Time Rnage-->
                        <div class="quarantine-search-to">
                          <div class="form-group">
                             <label>Time Range:</label>
                                <select name="name" class="form-control hand" v-model="searchTimeRange" required>
                                    <option class="dropdownSenderList" value="5 minutes">Last 5 minutes</option>
                                    <option class="dropdownSenderList" value="30 minutes">Last 30 minutes</option>
                                    <option class="dropdownSenderList" value="60 minutes">Last hour</option>
                                    <option class="dropdownSenderList" value="4 hours">Last 4 hours</option>
                                    <option class="dropdownSenderList" value="1 days">Last Day</option>
                                    <option class="dropdownSenderList" value="7 days">Last Week</option>
                                    <option class="dropdownSenderList" value="1 months">Last Month</option>
                                    <option class="dropdownSenderList" value="">Custom Range</option>
                                </select>
                          </div><!--/.form-group-->
                        </div><!--/.quarantine-search-subject-->

                        <!--Start-->
                        <div class="quarantine-search-from" v-if="customDateRange">
                          <div class="form-group">
                            <label>Start:</label>
                            <div class="input-group" id="search_start_datetime">
                              <input class="form-control" type="text" autocomplete="off" placeholder="DD/MM/YYYY" v-model="searchStartDate">
                              <span class="input-group-btn">
                                <button type="button" class="btn btn-flat btn-primary"><i class="far fa-calendar-alt"></i></button>
                              </span>
                            </div>
                          </div><!--/.form-group-->
                        </div><!--/.message-search-from-->
                        <!--End-->

                        <div class="quarantine-search-to" v-if="customDateRange">
                         
                          <div class="form-group">
                            <label>End:</label>
                            <div class="input-group" id="search_end_datetime">
                              <input class="form-control" type="text"  autocomplete="off" placeholder="DD/MM/YYYY" v-model="searchEndDate">
                              <span class="input-group-btn">
                                <button type="button" class="btn btn-flat btn-primary"><i class="far fa-calendar-alt"></i></button>
                              </span>
                            </div>
                          </div><!--/.form-group-->

                        </div><!--/.message-search-to-->

                        <!--Direction-->
                        <div class="quarantine-search-from ">
                          <div class="form-group">
                             <label>Direction:</label>
                                <select name="name" class="form-control hand" v-model="searchDirection" required>
                                    <option class="dropdownSenderList" value="">All</option>
                                    <option class="dropdownSenderList" :value="config.direction.INBOUND">Inbound</option>
                                    <option class="dropdownSenderList" :value="config.direction.OUTBOUND">Outbound</option>
                                </select>
                          </div><!--/.form-group-->
                        </div><!--/.quarantine-search-subject-->

                      </div><!-- /.message-search-wrap-->
                      
                      <div id="quarantine-search-action-btns-wrap">

                        <!--Search filters-->
                        <div id="quarantine-search-filters">
                          <div id="quarantine-search-wrap">
                          
                                <span class="legend spoofed">Sender and Display Address differ 
                                    <i class="fa fa-info-circle" title="This is purely informational. A legitimate message may often have a different underlying sending address. Please contact support if you are concerned that a message may be malicious."></i>
             
                                </span>
                            </div>    
                        </div><!-- /.message-search-filters-->


                       <!--Search button-->
                        <div id="quarantine-action-btns">
                          
                          <button type="button" class="btn btn-primary btn-flat" v-on:click="clearSearch(true)">
                            <i class="fa fa-times" ></i> Clear
                          </button>
                          <button type="submit" :disabled="searching" class="btn btn-primary btn-flat" v-on:click="newSearch()">
                            <span class="spinner" v-if="searching"></span>
                            <i class="icon-zoom" v-else></i> Search
                          </button>
                        </div><!-- /.message-action-btns-->
                      </div><!-- /.message-search-action-btns-wrap-->
                  </div><!--/.card-segment-horizontal-content-->
                </div><!--/.card-segment-horizontal-->
                
                <!--Search Entries-->
              
                <div class="card-segment-horizontal" id="ScrollToHere">
                  <div class="card-segment-horizontal-content">
                      <p v-if="messages.length === 0 && showNoResults">
                        <b>There are no results matching this search criteria at this moment.</b>
                      </p>


                    <!--Messages table-->
                    <div class="desktop-only">  
                      <table class="table table-hover sortable" id="message-msg-table" v-if="messages.length > 0">
                        <!--Table header-->
                       
                        <thead>
                          <tr>
                            <th>ID
                            </th>
                            <th>Datetime 
                            </th>
                            <th>Sender Display Address
                            </th>
                            <th>To
                            </th>
                            <th>Subject 
                            </th>
                            <th>Dir.
                            </th>
                            <th>State 
                            </th>
                            <th>&nbsp;
                            </th>
                            <th>&nbsp;
                            </th>
                          </tr>
                        </thead>
                    
                        <!--Table body-->
                        <tbody>
                            <!--Row-->
                            <!-- <template v-for="message in messages">
                            <tr v-bind:class="{ spoofed: message.spoofed }"> -->
                            <template>
                            <tr>
                                <td style="width: 5%">
                                    <span class="fake-link">
                                        <i class="fa fa-info-circle" :title="messages.uuid" @click="copyToClipboard(messages.uuid)"></i>
                                    </span>
                                </td>
                                <td style="width: 12%">
                                    {{ messages.sentAt | convertEpoch | formatDate }}
                                </td>
                                <td style="width: 25%">
                                    <span v-if="messages.sender">
                                        {{ messages.sender}}
                                    </span>
                                    <span v-else>
                                        {{ messages.sender}}
                                    </span>
                                    <br>
                                        <!-- <b-link v-if="message.spoofed" :id="message.message_id" href="#" tabindex="0" :key="message.message_id">
                                            Real Address
                                        </b-link>

                                        <b-popover :target="message.message_id" title="Envelope Address" triggers="hover" :key="message.message_id + '-pop'">
                                            {{ message['address_from'] }}
                                        </b-popover> -->
                                </td>
                                <td style="width: 15%">
                                    {{ messages.recipient }}
                                </td>
                                <td style="width: 20%">
                                    <span v-if="messages.subject">
                                    {{ messages.subject| truncateText(60) }}
                                    </span>
                                    <span v-else-if="message.state==='rejected'">
                                        <b-link v-if="message.nq_response" :id="message.message_id + '-nq'" href="#" tabindex="0" :key="message.message_id + '-nq'">
                                            Rejection Reason
                                        </b-link>

                                        <b-popover :target="message.message_id + '-nq'" title="Rejection Reason" triggers="hover" :key="message.message_id + '-nq-pop'">
                                            <b>Explanation:</b> {{ getRejectionExplanation(message['nq_response']) }}
                                            <br><br>
                                            <b>Full Log:</b> {{ message['nq_response'] }}

                                            <br><br>
                                            <b>Why is there no subject line?</b>This message was rejected before any data was accepted. We do not record subject line data for these messages.
                                        </b-popover>

                                    </span>
                                </td>
                                <td style="width: 5%">
                                    <span v-if="message['direction']===config.direction.INBOUND">
                                        Inbound
                                    </span>
                                    <span v-else>
                                        Outbound
                                    </span>
                                </td>
                                <td style="width: 5%">
                                    {{ getMessageStateName(message['state']) }}
                                </td>
                                <td style="width: 5%">
                                    <span v-if="message.size">
                                    {{ message['size'] | humanFileSize(false, 1) }}
                                    </span>
                                    <span v-if="messages.has_attachment===true">
                                        <i class="fa fa-paperclip"></i> 
                                    </span>
                                </td>
                                <td style="width: 5%">
                                    <a href="#" @click.prevent="message.showDetails=!message.showDetails;">
                                        <span v-if="messages.showDetails===true">
                                            Less
                                        </span>
                                        <span v-else>
                                            More
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <!-- <tr v-show="message.showDetails">
                                <td colspan=9>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <ul>
                                                <li><b>Sender IP</b>: {{ message.ip }}</li>
                                                <li><b>Sender Hostname</b>: {{ message.sender_hostname }}</li>
                                                <li><b>Whitelisting</b>:
                                                    <span v-if="message.whitelist_level === ''">None
                                                    </span>
                                                    <span v-else>
                                                        {{ message.whitelist_level }}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-4">
                                            <ul>
                                                <li><b>Attachments:</b>
                                                    <span v-if="message.attachments_count===0">None</span>
                                                </li>
                                                <li v-for="attachment in parseAttachments(message.attachments_names)">
                                                    {{ attachment }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-4" v-if="message.state==='quarantined'">
                                            <ul>
                                                <li><b>Quarantine Details</b>: {{ message.quarantine_detail }}
                                                </li>
                                                <li><b>Virus Name</b>: 
                                                    <span v-if="message.virus_name===''">No Virus</span>
                                                    <span v-else>{{ message.virus_name }}</span>
                                                </li>
                                                <li><b>Sandbox Information</b>: 
                                                    <span v-if="message.sandbox_result===''">No Sandboxing Performed</span>
                                                    <span v-else>{{ message.sandbox_result }} </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr> -->
                            </template>
                        </tbody>
                      </table>
                    </div>

                    <!--Pagination and action button-->
                    <div class="table-toolbar">
                      <div class="table-footer-toolbar">  
                        <!--Left half-->
                          
                        <div class="table-toolbar-col33" id="col33-middle" v-if="messages.length > 0">
                          <div class="results-display-ctrl">
                            <div class="results-view-dropdown-wrap row">
                              <select class="custom-select" name="results-per-page" v-model="baseLimit" id="results-per-page">
                                <option value="10" selected>Results per page:</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                              <div class="export-position" v-if="!downloading">
                                <i class="fas fa-file-csv fa-2x fake-link" title="Export to Excel" @click="downloadMessageHistoryEntries()"></i>
                                <i class="fas fa-calendar-plus fa-2x fake-link" title="Save Search as Scheduled Report" @click="createScheduledReport()"></i>
                              </div>
                              <div v-else class="spinner-border text-primary export-position" role="status">
                              </div>
                            </div><!--/.results-view-dropdown-wrap-->
                          </div>
                        </div>
                        <!--Right half-->
                        <!--Message History toolbar-->
                        <div class="card-segment-horizontal-tier" id="message-toolbar-wrap">
                            <div class="message-toolbar">
                                <pagination :count="count" :limit="baseLimit" :maxPaginationCount=4 @paged="paged"></pagination>
                            </div><!--/.message-toolbar-->
                        </div><!--/.card-segment-horizontal-tier#message-toolbar-wrap-->

                      </div><!--/.table-footer-toolbar-->
                    </div><!--/.table-toolbar-->
                  

                  </div><!--/.card-segment-horizontal-content-->
                </div><!--/.card-segment-horizontal-->


              </div><!--/.card-body-->

            </div><!--/.card-->
          </div><!--/.col-lg-12-->
        </div><!--/.row-->
      </div><!--/.container-fluid-->
    </section><!-- #inner-content-wrap-->
</div>
</template>

<script>
import api from '../../api';
import utils from '../../utils';
import * as apiCustomers from '../../api/customers';
import * as apiDomains from '../../api/domains';
import * as apiMessageHistory from '../../api/message_history';
import helpers from '../../helpers';
import moment from 'moment';
import pagination from '../layouts/Pagination';
import config from '../../config/config';

export default {
  name: 'MessageSearch',
  components: {
    pagination
  },
  data() {
    return {
      // This approach works best for dropdown control, sadly
      customers: [],
      customerId: "",
      domains: [],
      domainId: "",
      downloading: false,
      config: config,
      parentCustomerId: null,
      count: 0,
      messages: [],
      senders: [],
      recipients: [],
      searchTo: '',
      searchFrom: '',
      searchSubject: '',
      searchStartDate: '',
      customDateRange: false,
      searchTimeRange: "4 hours",
      searchEndDate: '',
      searchSubject: '',
      searchDirection: '',
      searchState: 'delivered',
      baseLimit: 10,
      orderBy: '',
      searching: false,
      showNoResults: false
    }
  },
  mounted() {
      var self = this;
      this.profile = this.$root.$data.sharedState.profile;

      if (this.profile.parentType==='CUSTOMER') {
        this.parentCustomerId = this.profile.parentId;
        this.customerId = this.parentCustomerId;
      } else {
        this.loadCustomers();
      }

  },

  watch: {
    
    customerId: function () {
        if (this.customerId) {
            this.loadDomains();
        } else {
            this.domains = [];
            this.domainId = '';
        }
      },

      
      searchTimeRange: function(newval, oldval) {
        if (newval) {
            this.customDateRange = false;
        } else {
            // setting the dateime pickers for the search start and search end dates
            var self = this;
            $(document).ready(function () {
                $("#search_start_datetime").datetimepicker({ step:5, inline:false, format: 'Y-m-d H:i:s' });
                $("#search_end_datetime").datetimepicker({ step:5, inline:false , format: 'Y-m-d H:i:s'});
                $("#search_start_datetime").on("change paste keyup", function() {
                    self.searchStartDate = utils.formatDate(this.value); 
                });
                $("#search_end_datetime").on("change paste keyup", function() {
                    self.searchEndDate = utils.formatDate(this.value); 
                });
            });

            this.customDateRange = true;
        }
      }

  },
    methods: {

      createScheduledReport: function() {
        this.$router.push({ name: 'ScheduledReportCreate', params: { 'messageHistorySearchCriteria': this.searchOptions } });
      },

      downloadMessageHistoryEntries: function(){
            this.downloading = true;

            let downloadOptions = JSON.parse(JSON.stringify(this.searchOptions));

            delete downloadOptions['offset'];
            delete downloadOptions['limit'];
            downloadOptions.csv = true;
            downloadOptions.timezone = this.profile.timezone

            apiMessageHistory.getMessages((err, entries) => {
                this.downloading = false;

                if (err) {
                    this.$toastr("error", err, "Error Occurred");
                    return;
                }

                const csv = entries.messages;
                utils.downloadCSV(csv, 'Message_History-' + this.searchStartDate.slice(0, 10) + '-to-' + this.searchEndDate.slice(0, 10));

            }, downloadOptions);
      },
 
        getRejectionExplanation: function(rejectionResponse) {
            let matches = [
                { regex: 'Recipient address rejected',
                  explanation: 'Recipient address was invalid. This means the address does not exist, or that the internal mail system refuses to deliver to that mailbox.' },
                { regex: 'blocked using',
                  explanation: 'Sender is on Blacklist. Our top level blacklists block only messages from known bulk spam sources.' },
                { regex: 'Sender address rejected: Domain not found',
                  explanation: 'Sender domain does not exist. The domain of the sender who is sending you this message, did not have MX or A records. Usually this means the message is spam, or not intended to be delivered via public networks.' },
                { regex: 'SPF Fail',
                  explanation: 'The sender failed SPF Checks. SPF (Sender Policy Framework) is a policy defined by the sender to prevent spoofing of their domain. This message is likely to be a spoofed email sent with a deceptive intent.' }
            ];

            var explanation;
            var known = matches.some(match => {
                let re = new RegExp(match.regex, 'i');
                let found = re.test(rejectionResponse);
                if (found) explanation = match.explanation;
                return found;
            });
    
            if (!known) explanation = 'Unknown';

            return explanation;
        },

        setDateRange: function(range) {
            let rangeElements = range.split(' ');
            let rangeValue = rangeElements[0];
            let rangeUnit = rangeElements[1];

            this.searchEndDate = moment().format("YYYY-MM-DD HH:mm:ss");
            this.searchStartDate = moment().subtract(rangeValue, rangeUnit).format("YYYY-MM-DD HH:mm:ss");
        },

        copyToClipboard: function(str) {
            utils.copyToClipboard(str);
            this.$toastr("success", "Message ID Copied to Clipboard", "Success");
        },

        getMessageStateName: function(name) {
            return utils.titleCase(name);
        },

        loadCustomers: function() {
            apiCustomers.getCustomers((err, customers) => {

                if (err) {
                    this.$toastr("error", err, "Error Occurred");
                    return;
                }
    
                // The returned object also has a count but we don't need it
                this.customers = customers.customers;
            });
        },

        loadDomains: function () {

            this.domains = [];

            let options = {
                customer_id: this.customerId
            };

            apiDomains.getDomains((err, response) => {
                if(err){
                    this.$toastr("error", err, "An Error Occurred");
                    return;
                }

                this.domains = response.domains;
                // Reset the dropdown
                this.domainId = '';
            }, options);
        },

        // sets the order by for the search query and refreshes the quarantine items
        setOrderBy: function (ordering) {
            if (ordering == this.orderBy){
                this.orderBy = '-' + ordering;
            }else{
                this.orderBy = ordering;
            }
            this.searchOptions.order = this.orderBy;
            this.getMessages();
        },

        /* Handler for when page changes (or page changed is forced by limit change)

            - no validation performed
            - search options not changed
            - offset and limit altered

        */
        paged: function(limit, offset) {
            this.searchOptions.limit = limit;
            this.searchOptions.offset = offset;
            this.getMessages(function() {
                document.getElementById("ScrollToHere").scrollIntoView();
            });
        },

        // Sets the current search so changes to search fields do not cause
        // different results on pagination events - offset/limit always reset
        setSearch: function() {
            if (!this.customDateRange) {
                this.setDateRange(this.searchTimeRange);
            }

            let options = {
                recipientEmail: this.searchTo.trim(),
                senderEmail: this.searchFrom.trim(),
                subject: this.searchSubject.trim(),
                timeFrom: this.searchStartDate ? utils.formatDate(this.searchStartDate) : undefined,
                timeTo: this.searchEndDate ? utils.formatDate(this.searchEndDate) : undefined,
                order: this.orderBy,
                customerId: this.parentCustomerId || this.customerId,
                domainId: this.domainId || undefined,
                direction: this.searchDirection === '' ? undefined : this.searchDirection,
                state: this.searchState || undefined,
                offset: 0,
                limit: this.baseLimit,
                timezone: this.$parent.profile.timezone
            };

            this.searchOptions = options;
        },
  
        /* Main call for any new quarantine search

           - validation is performed
           - search options ARE reset including offset/limit
 
        */
        newSearch: function() {
            this.setSearch();

            /* In order to reset pagination we have to reset count
                Usually this would work automatically because count is changed
                after a new search is loaded...but there is an edge case where the
                resultset has the same length as the last and then this does not work
            */
            this.count = 0;
            this.messages = [];
            this.getMessages();
        },

        getMessages: function(callback) {
            this.searching = true;

            apiMessageHistory.getMessages((err, entries) => {
                this.searching = false;
                this.showNoResults = true;

                if (err) {
                    this.$toastr("error", err, "Error Occurred");
                    return;
                }
                this.messages = entries
                // .map(message => {
                //   // console.log("The entries details: %s", message)
                //   message.showDetails = false;
                //   return message;
                // });
                // this.count = entries.count;
                this.count = 1;

                if (callback) callback();
            },
            this.searchOptions);
        },

        parseAttachments: function(attachments) {
            try {
                attachments = JSON.parse(attachments)
            } catch (e) {
                console.log("Undefined attachments")
            }
            if (!Array.isArray(attachments)) return [];
           return attachments.map(attachment => {
            return attachment;
           });
        },

        clearSearch: function(resetCustomer) {  
            this.showNoResults = false;
            if (resetCustomer) this.customerId = '';
            this.domainId = '';
            this.searchFrom = '';
            this.searchTo = '';
            this.$refs.senderSearchAutocomplete.inputValue = '';
            this.$refs.recipientSearchAutocomplete.inputValue = '';
            this.searchSubject = '';
            this.searchStartDate = '';
            this.searchEndDate = '';
            this.searchDirection = '';
            this.searchState = '';
            this.messages = [];
            this.count = 0;
        }

    }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .catch-headers{
    display: none;
  }

  .export-position {
    margin-left: 10px;
    margin-top: 5px;
  }

  .spoofed{
    background: #ffe69d !important;
  }

  .legend {
    padding: 2px;
  }

</style>