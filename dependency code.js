**************** Supplier select korle tar upor depend kore category ashbe ja amra product table a add koresilam supplier onojayi**************
**********html****************
 <div class="form-group col-md-4">
                                <label >Supplier Name</label>
                                <select name="supplier_id" class="form-control" id="supplier_id">
                                  <option value="">Select Supplier</option>
                                  @foreach ($suppliers as $supplier)
                                      <option value="{{ $supplier->id }}">{{ $supplier->name }}</option>
                                  @endforeach

                                </select>

                            </div>

                            <div class="form-group col-md-4">
                                <label >Category</label>
                                <select name="category_id" class="form-control" id="category_id">
                                  <option value="">Select Category</option>

                                </select>

            </div>


*****ajax code**********
  {{-- dependancy dropdown ajax --}}
  <script>
    $(function(){
        $(document).on('change','#supplier_id', function(){
           var supplier_id = $(this).val();
           $.ajax({
              url : "{{ route('get-category') }}",
              type : "GET",
              data :{supplier_id:supplier_id},
              success:function(data){
                var html = '<option value="">Select Category</option>';
                $.each(data,function(key,v){
                  html += '<option value="'+v.category_id+'">'+v.category.name+'</option>';
                });
                $('#category_id').html(html);
              }

           });
        });
    });
  </script>

*******route************
// ajax rout gola using default controller
Route::get('/get-category','Backend\DefaultController@getcategory')->name('get-category');

//category model ta purcase e relation kore nibo oi function ta die show hbe nam cz purchse table e categoryid ta ase jst//
***************Controller***********

   public function getcategory(Request $request){
        $supplier_id = $request->supplier_id;
        $allcategory = Product::with(['category'])->select('category_id')->where('supplier_id',$supplier_id)->groupBy('category_id')->get();

        return response()->json($allcategory);
    }