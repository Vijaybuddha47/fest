@php
$arrParamForValidation = array("current_password" => array("type" => "text", "msg" => "Current Password"), "new_password" => array("type" => "text", "msg" => "New Password"),"new_confirm_password "=> array("type" => "text", "msg" => "Confirm New Password"));

@endphp
@extends('backend.layouts.master')
@section('content')

   <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
  @if($errors->any())
<div class="alert alert-danger">
	<ul>
		@foreach($errors->all() as $error)
		<li>{{ $error }}</li>
		@endforeach
	</ul>
</div>
@endif
    <!-- Content Header (Page header) -->
    <section class="content-header">
    @if ($message = Session::get('success'))
		<div class="alert alert-success"><p>{{ $message }}</p></div>
	@endif
    @if ($message = Session::get('error'))
		<div class="alert alert-danger"><p>{{ $message }}</p></div>
	@endif
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1>My Account Settings</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">        
          <div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">                                   
                  <li class="nav-item"><a class="nav-link" href="{{ url('cms/profile-settings') }}">Profile Setting</a></li>
				  <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Change Password</a></li> 
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="activity">
                     <form method="POST" action="{{route('change-password.store')}}" onSubmit='return validation(1, {{json_encode($arrParamForValidation) }});' class="form-horizontal">
                      <div class="form-group row">
                      @php
					          $strFldName = 'current_password';
                        @endphp
                        @csrf
                        <label for="inputName" class="col-sm-2 col-form-label"><span class="text-danger">*</span>Current Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="{{$strFldName}}" name="{{$strFldName}}" >
                          <span class="invalid-feedback text-danger" id="span_{{$strFldName}}">{{$errors->first($strFldName)}}</span>
                        </div>
                        
                      </div>
                      <div class="form-group row">
                      @php
					          $strFldName = 'new_password';
                        @endphp
                        <label for="inputEmail" class="col-sm-2 col-form-label"><span class="text-danger">*</span>New Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="{{$strFldName}}" name="{{$strFldName}}"  >
                          <span class="invalid-feedback text-danger" id="span_{{$strFldName}}">{{$errors->first($strFldName)}}</span>
                      </div>
                        </div>
                        
                      <div class="form-group row">
                      @php
					          $strFldName = 'new_confirm_password';
                        @endphp
                        <label for="inputName2" class="col-sm-2 col-form-label"><span class="text-danger">*</span>Confirm Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="{{$strFldName}}" name="{{$strFldName}}" >
                          <span class="invalid-feedback text-danger" id="span_{{$strFldName}}">{{$errors->first($strFldName) }}</span>
                        </div>
                        
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </form>                 
                  </div>
                 
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
@endsection('content')