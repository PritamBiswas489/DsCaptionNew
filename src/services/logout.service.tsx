import { useDispatch } from 'react-redux';
import { serviceProviderAccountDataActions } from '@src/store/redux/service-provider-account-data.redux';
import { mySubscriptionsAction } from '@src/store/redux/my-subscriptions-redux';
import { homeDataActions } from '@src/store/redux/home-data-redux';
import { serviceMenDataAction } from '@src/store/redux/servicemen-list';
import { serviceMenDetailsAction } from '@src/store/redux/servicemen-details-redux';
import { serviceActions } from '@src/store/redux/service-redux';
import { RootState, AppDispatch } from '@src/store';
import { serviceDetailsAction } from '@src/store/redux/service-details-redux';
import { bankDetailsActions } from '@src/store/redux/bank-details-redux';
import { reviewsDataActions } from '@src/store/redux/reviews-list-redux';
import { serviceCategoriesDataActions } from '@src/store/redux/service-category-redux';
import { serviceSubCategoriesActions } from '@src/store/redux/service-sub-category-redux';
import { serviceProviderBookingReviewActions } from '@src/store/redux/service-provider-booking-review-redux';
import { serviceProviderPomotionalCostActions } from '@src/store/redux/service-provider-pomotional-cost-redux';
import { notificationsAction } from '@src/store/redux/notifications-data-redux';
import { allListingActions } from '@src/store/redux/all-listing-redux';
import { pendingListingActions } from '@src/store/redux/pending-listing-redux';
import { completedListingActions } from '@src/store/redux/completed-listing-redux';
import { acceptedListingActions } from '@src/store/redux/accepted.listing-redux';
import { canceledListingActions } from '@src/store/redux/canceled-listing-redux';
import { ongoingListingActions } from '@src/store/redux/ongoing-listing-redux';
import { availableTimeSlotActions } from '@src/store/redux/available-time-slot-redux';
import { businessSettingsActions } from '@src/store/redux/business-settings-redux';
import { bookingReportActions } from '@src/store/redux/booking-reports-redux';
import { reportFiltersActions } from '@src/store/redux/reports-filter-redux';
import { transactionReportActions } from '@src/store/redux/transactions-reports-redux';
import { serviceOverviewActions } from '@src/store/redux/service-overview-redux';
import { transactionsReportFiltersActions } from '@src/store/redux/transactions-reports-filter-redux';
import { businessEarningListingActions } from '@src/store/redux/business-earning-listing-redux';
import { businessExpenseActions } from '@src/store/redux/business-expenses-redux';
import { businessReportFiltersActions } from '@src/store/redux/business-reports-filter-redux';
import { homeStatisticsGraphActions } from '@src/store/redux/home-statistics-graph-redux';

//logout clear redux function
export function  logoutClearReduxState(dispatch:AppDispatch){
      dispatch(serviceProviderAccountDataActions.resetState())
      dispatch(mySubscriptionsAction.resetState())
      dispatch(homeDataActions.resetState())
      dispatch(serviceMenDataAction.resetState())
      dispatch(serviceMenDetailsAction.resetState())
      dispatch(serviceActions.resetState())
      dispatch(serviceDetailsAction.resetState())
      dispatch(bankDetailsActions.resetState())
      dispatch(reviewsDataActions.resetState())
      dispatch(serviceCategoriesDataActions.resetState())
      dispatch(serviceSubCategoriesActions.resetState())
      dispatch(serviceProviderBookingReviewActions.resetState())
      dispatch(serviceProviderPomotionalCostActions.resetState())
      dispatch(notificationsAction.resetState())
      dispatch(allListingActions.resetState())
      dispatch(pendingListingActions.resetState())
      dispatch(completedListingActions.resetState())
      dispatch(acceptedListingActions.resetState())
      dispatch(canceledListingActions.resetState())
      dispatch(ongoingListingActions.resetState())
      dispatch(availableTimeSlotActions.resetState())
      dispatch(businessSettingsActions.resetState())
      dispatch(bookingReportActions.resetState()) //booking report actions
      dispatch(reportFiltersActions.resetState())
      dispatch(transactionReportActions.resetState())
      dispatch(transactionsReportFiltersActions.resetState())
      dispatch(serviceOverviewActions.resetState())
      dispatch(businessEarningListingActions.resetState()) //business earning listing actions
      dispatch(businessExpenseActions.resetState()) //business expense actions
      dispatch(businessReportFiltersActions.resetState()) //business report filter actions
      dispatch(homeStatisticsGraphActions.resetState())
}